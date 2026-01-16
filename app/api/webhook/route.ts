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

// Generate license key: base64(email:expiry:signature)
function generateLicenseKey(email: string, subscriptionId: string): string {
  // Set expiry to 1 year from now
  const expiry = Date.now() + 365 * 24 * 60 * 60 * 1000;
  
  // Simple signature (in production, use proper HMAC)
  const signature = Buffer.from(`${email}:${subscriptionId}:${process.env.LICENSE_SECRET}`).toString('base64').substring(0, 16);
  
  const licenseData = `${email}:${expiry}:${signature}`;
  return Buffer.from(licenseData).toString('base64');
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log('Webhook event:', event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_email || session.customer_details?.email;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (customerEmail && customerId) {
          // Generate license key
          const licenseKey = generateLicenseKey(customerEmail, subscriptionId);

          // Store in database
          const { error } = await supabase.from('licenses').insert({
            email: customerEmail,
            license_key: licenseKey,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            status: 'active',
            created_at: new Date().toISOString(),
          });

          if (error) {
            console.error('Database error:', error);
          } else {
            console.log(`License created for ${customerEmail}`);
            
            // TODO: Send email with license key
            // await sendLicenseEmail(customerEmail, licenseKey);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Update license status
        await supabase
          .from('licenses')
          .update({
            status: subscription.status,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        console.log(`Subscription updated for customer ${customerId}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Deactivate license
        await supabase
          .from('licenses')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        console.log(`License canceled for customer ${customerId}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Mark license as payment_failed
        await supabase
          .from('licenses')
          .update({
            status: 'payment_failed',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        console.log(`Payment failed for customer ${customerId}`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
