# Quick Setup Instructions

## 1. Get Supabase Service Role Key

Go to: https://supabase.com/dashboard/project/zaznswgcpbscczoavkky/settings/api

Copy the **"service_role"** key (long JWT token starting with `eyJ...`)

## 2. Run SQL Schema

Go to: https://supabase.com/dashboard/project/zaznswgcpbscczoavkky/sql

Click "New query" and paste the entire contents of `supabase-schema.sql`, then click "Run"

## 3. Update Vercel Environment Variable

Once you have the service role key, run:

```bash
cd /Users/morgan/purfect-labs/aijump-landing
echo 'YOUR_SERVICE_ROLE_KEY' | vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel --prod --yes
```

## 4. Next: Stripe Setup

After Supabase is configured, we'll set up Stripe for payments.

---

**Current Supabase Project**:
- URL: https://zaznswgcpbscczoavkky.supabase.co
- Project ID: zaznswgcpbscczoavkky
- Anon Key: sb_publishable_df85wFkAKbW1KWHRgwqlMw_0dXGgAoZ
- Service Key: (get from dashboard)
