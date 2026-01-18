# AiJump Landing Page

Payment and license distribution page for AiJump VSCode extension.

## Features

- Stripe subscription checkout ($7.99/month with 7-day trial)
- Automatic license key generation
- Supabase integration for license storage
- Success page with license key display
- Webhook handling for subscription management

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a `licenses` table in your Supabase project:

```sql
CREATE TABLE licenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  license_key TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_licenses_stripe_customer ON licenses(stripe_customer_id);
CREATE INDEX idx_licenses_email ON licenses(email);
```

### 3. Set Up Stripe

1. Create a product in Stripe Dashboard
2. Create a price: $7.99/month
3. Copy the price ID
4. Set up webhook endpoint pointing to `/api/webhook`
5. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`

### 4. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your values:

```env
NEXT_PUBLIC_BASE_URL=https://aijump.purfectlabs.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
LICENSE_SECRET=your-random-secret-string
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel project settings
3. Deploy!

### Post-Deployment

1. Update Stripe webhook URL to production URL
2. Test the complete flow:
   - Purchase → License generation → Email delivery
3. Set up monitoring for webhook failures

## API Endpoints

- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhook` - Handle Stripe webhook events
- `GET /api/license?session_id={id}` - Retrieve license key

## License Key Format

License keys are base64-encoded strings containing:
- Customer email
- Expiry timestamp (1 year)
- Signature (for validation)

Format: `base64(email:expiry:signature)`

## Support

For issues or questions:
- Email: hello@purfectlabs.com
