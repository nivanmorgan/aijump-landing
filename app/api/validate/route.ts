import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHmac, timingSafeEqual } from 'crypto';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type DecodeResult = {
  email: string;
  expiry: number;
  signature: string;
};

function decodeLicenseKey(licenseKey: string): DecodeResult | null {
  try {
    const decoded = Buffer.from(licenseKey, 'base64').toString('utf-8');
    const [email, expiryStr, signature] = decoded.split(':');
    if (!email || !expiryStr || !signature) {
      return null;
    }
    const expiry = parseInt(expiryStr, 10);
    if (!Number.isFinite(expiry)) {
      return null;
    }
    return { email, expiry, signature };
  } catch (error) {
    return null;
  }
}

function signLicense(email: string, expiry: number, subscriptionId: string): string {
  const secret = process.env.LICENSE_SECRET || '';
  const payload = `${email}:${expiry}:${subscriptionId}`;
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function signaturesMatch(expected: string, received: string): boolean {
  if (expected.length !== received.length) {
    return false;
  }
  return timingSafeEqual(Buffer.from(expected), Buffer.from(received));
}

function isActiveStatus(status?: string | null): boolean {
  return status === 'active' || status === 'trialing';
}

export async function POST(request: Request) {
  try {
    const { licenseKey } = (await request.json()) as { licenseKey?: string };
    if (!licenseKey) {
      return NextResponse.json({ valid: false, error: 'Missing licenseKey' }, { status: 400 });
    }

    const decoded = decodeLicenseKey(licenseKey);
    if (!decoded) {
      return NextResponse.json({ valid: false, error: 'Invalid format' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('license_key', licenseKey)
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false, error: 'License not found' }, { status: 404 });
    }

    const expected = signLicense(decoded.email, decoded.expiry, data.stripe_subscription_id);
    if (!signaturesMatch(expected, decoded.signature)) {
      return NextResponse.json({ valid: false, error: 'Signature mismatch' }, { status: 401 });
    }

    if (Date.now() > decoded.expiry) {
      return NextResponse.json({ valid: false, error: 'License expired' }, { status: 403 });
    }

    if (!isActiveStatus(data.status)) {
      return NextResponse.json({ valid: false, status: data.status, email: data.email }, { status: 403 });
    }

    return NextResponse.json({ valid: true, status: data.status, email: data.email });
  } catch (error: any) {
    console.error('License validation error:', error);
    return NextResponse.json({ valid: false, error: 'Validation failed' }, { status: 500 });
  }
}
