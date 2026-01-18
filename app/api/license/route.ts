import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customerId = session.customer as string;

    // Get license from database
    const { data, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('stripe_customer_id', customerId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'License not found' },
        { status: 404 }
      );
    }

    if (data.status !== 'active' && data.status !== 'trialing') {
      return NextResponse.json(
        { error: 'License inactive', status: data.status },
        { status: 403 }
      );
    }

    return NextResponse.json({
      license_key: data.license_key,
      email: data.email,
      status: data.status,
    });
  } catch (error: any) {
    console.error('License retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve license' },
      { status: 500 }
    );
  }
}
