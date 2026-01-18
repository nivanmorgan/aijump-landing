# AiJump Architecture & Flow Documentation

## Project Overview

AiJump is a VSCode extension providing DevOps automation with a freemium SaaS model.

### Business Model
- **Free Tier**: Basic commands (AiGo, AiLearn, AiShow, AiWorks)
- **Pro Tier**: $7.99/month with 7-day free trial (AiBuild, AiBaseline, AiPublish, AiSanity, AiPossible)

---

## Tech Stack

### VSCode Extension
- **Language**: TypeScript
- **Framework**: VSCode Extension API
- **AI Providers**: OpenAI, Anthropic (Claude), Custom endpoints
- **Package Manager**: npm
- **Publisher**: purfectlabs
- **Marketplace**: https://marketplace.visualstudio.com/items?itemName=purfectlabs.aijump-extension

### Landing Page & API
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel
- **Domain**: https://aijump.purfectlabs.com
- **Environment**: Production

### Database
- **Provider**: Supabase (PostgreSQL)
- **Project**: kqtdaqihmwkbmgkhyoga
- **URL**: https://kqtdaqihmwkbmgkhyoga.supabase.co
- **Purpose**: Store license keys and subscription data
- **Why Supabase**: 
  - Simple SQL for structured data (licenses table)
  - Built-in auth & RLS
  - Free tier sufficient
  - You already have credentials
  - Industry standard for SaaS

### Payment Processing
- **Provider**: Stripe (to be configured)
- **Product**: Monthly subscription ($7.99)
- **Trial**: 7 days free
- **Webhook**: Handles subscription events

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                          │
└─────────────────────────────────────────────────────────────┘

1. User visits https://aijump.purfectlabs.com
2. Clicks "Install Free" or "Start 7-Day Free Trial"
3. Installs extension from VSCode Marketplace
4. Uses free commands immediately (no auth required)

┌─────────────────────────────────────────────────────────────┐
│                    PRO UPGRADE FLOW                          │
└─────────────────────────────────────────────────────────────┘

USER ACTION                  SYSTEM RESPONSE
─────────────────────────────────────────────────────────────
1. User tries Pro command    → Extension checks license key
   (e.g., AiBuild)           → Shows upgrade prompt if none

2. User clicks "Get Pro"     → Opens landing page
   or visits landing page    → Clicks "Start 7-Day Free Trial"

3. Stripe checkout          → User enters payment info
                            → Stripe creates subscription
                            → Returns to success page

4. Webhook fires            → POST to /api/webhook
   (checkout.session        → Verifies signature
    .completed)             → Generates license key
                            → Stores in Supabase
                            → (Future: Email license)

5. Success page shows       → User copies license key
   license key              

6. User pastes in VSCode    → Extension validates key
   settings                 → Enables Pro features

7. Extension checks         → On activation, reads config
   license status           → Decodes base64 license
                            → Checks expiry date
                            → Enables/disables Pro commands
```

---

## Data Flow

### License Key Format
```
base64(email:expiry_timestamp:signature)
```

Example:
```
dGVzdEBleGFtcGxlLmNvbToxNzA3MzQwODAwMDAwOmFiYzEyMw==
```

### Supabase Schema
```sql
licenses (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  license_key TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT CHECK (status IN ('active', 'trialing', 'canceled', 'payment_failed', 'past_due')),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

### Stripe Events We Handle
```javascript
checkout.session.completed       → Create license
customer.subscription.updated    → Update status
customer.subscription.deleted    → Deactivate license
invoice.payment_failed           → Mark payment_failed
```

---

## Directory Structure

```
/Users/morgan/purfect-labs/
├── aijump-extensions/              # VSCode Extension
│   ├── src/
│   │   ├── extension.ts            # Main entry point
│   │   ├── ai/
│   │   │   └── openaiProvider.ts   # Multi-provider AI client
│   │   ├── commands/               # All AiJump commands
│   │   │   ├── aiGo.ts            # Help (free)
│   │   │   ├── aiLearn.ts         # Learn project (free)
│   │   │   ├── aiShow.ts          # Show structure (free)
│   │   │   ├── aiWorks.ts         # List projects (free)
│   │   │   ├── aiBuild.ts         # Infrastructure gen (pro)
│   │   │   ├── aiBaseline.ts      # State reports (pro)
│   │   │   ├── aiPublish.ts       # Deployment (pro)
│   │   │   └── aiAdvanced.ts      # Sanity/Possible (pro)
│   │   └── core/
│   │       ├── license.ts          # License validation
│   │       ├── memory.ts           # Project memory
│   │       └── registry.ts         # Command registry
│   ├── package.json                # Extension manifest
│   └── PROJECT_STATUS.md           # Status tracking
│
└── aijump-landing/                 # Landing Page & API
    ├── app/
    │   ├── page.tsx                # Homepage
    │   ├── success/page.tsx        # Post-checkout
    │   ├── layout.tsx              # Root layout
    │   ├── globals.css             # Tailwind styles
    │   └── api/
    │       ├── checkout/route.ts   # Create Stripe session
    │       ├── webhook/route.ts    # Handle Stripe events
    │       └── license/route.ts    # Query license by session
    ├── supabase-schema.sql         # Database schema
    ├── package.json                # Dependencies
    └── ARCHITECTURE.md             # This file
```

---

## Environment Variables

### Vercel Production (aijump-landing)
```bash
# Base
NEXT_PUBLIC_BASE_URL=https://aijump.purfectlabs.com

# Supabase (✅ CONFIGURED)
NEXT_PUBLIC_SUPABASE_URL=https://kqtdaqihmwkbmgkhyoga.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Stripe (⏳ TO BE CONFIGURED)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# License Generation
LICENSE_SECRET=your-random-secret-string
```

### VSCode Extension (User Settings)
```json
{
  "aijump.aiProvider": "openai",
  "aijump.openaiApiKey": "sk-...",
  "aijump.openaiModel": "gpt-4o-mini",
  "aijump.licenseKey": "base64_encoded_license"
}
```

---

## API Endpoints

### POST /api/checkout
**Purpose**: Create Stripe checkout session  
**Input**: `{ priceId: string }`  
**Output**: `{ url: string }` (redirect to Stripe)  
**Flow**:
1. Create Stripe checkout session
2. Set success_url with session_id
3. Return checkout URL

### POST /api/webhook
**Purpose**: Handle Stripe webhook events  
**Input**: Stripe event payload + signature  
**Output**: `{ received: true }`  
**Flow**:
1. Verify webhook signature
2. Parse event type
3. Generate license key (base64)
4. Insert into Supabase
5. Update status based on event

### GET /api/license?session_id={id}
**Purpose**: Retrieve license after checkout  
**Input**: Stripe session_id (query param)  
**Output**: `{ license_key: string, email: string }`  
**Flow**:
1. Query Supabase for session_id
2. Return license and email
3. Displayed on success page

---

## Key Design Decisions

### Why These Choices?

#### 1. **Supabase (not Convex/Weaviate)**
- **Reason**: Simple relational data (licenses table)
- **Alternative**: Convex (real-time, overkill), Weaviate (vector DB, overkill)
- **Decision**: PostgreSQL is industry standard for SaaS license management

#### 2. **VSCode Extension (not web app)**
- **Reason**: Target audience is developers in their IDE
- **Benefit**: Direct integration with workspace, files, git

#### 3. **Multi-AI Provider Support**
- **Reason**: Users may have preferences or restrictions
- **Options**: OpenAI, Anthropic, custom endpoints (Ollama, LM Studio)

#### 4. **Base64 License Keys (not JWT)**
- **Reason**: Simple, offline validation, no API calls
- **Format**: email:expiry:signature encoded
- **Validation**: Extension decodes and checks expiry locally

#### 5. **7-Day Trial**
- **Reason**: Low friction, standard SaaS practice
- **Implementation**: License stored on first checkout, Stripe handles billing

#### 6. **MonoGenesis (Single Bash Script)**
- **Reason**: Simplifies deployment for users
- **Alternative**: Ansible, Chef, Puppet (too complex)

---

## Current Status

### ✅ Completed
- [x] VSCode extension built
- [x] Multi-provider AI support
- [x] Free/Pro tier licensing system
- [x] All commands implemented
- [x] Published to marketplace
- [x] Landing page designed & deployed
- [x] Custom domain configured
- [x] Supabase credentials configured
- [x] Projects organized under purfect-labs

### ⏳ In Progress
- [ ] Run Supabase schema (licenses table)
- [ ] Configure Stripe account
- [ ] Set up Stripe webhook
- [ ] Test end-to-end payment flow

### 📋 Next Steps (In Order)
1. **Run SQL in Supabase** (5 min)
   - Go to SQL editor
   - Paste schema from supabase-schema.sql
   - Run query

2. **Set Up Stripe** (30 min)
   - Create account
   - Create product ($7.99/month)
   - Get API keys
   - Configure webhook endpoint
   - Update Vercel env vars

3. **Test Payment Flow** (15 min)
   - Use Stripe test mode
   - Complete checkout
   - Verify license creation
   - Test in VSCode

4. **Email Notifications** (optional, later)
   - SendGrid or Resend
   - Welcome email with license
   - Trial ending reminders

---

## Testing Checklist

### Free Tier
- [ ] Install extension from marketplace
- [ ] Run AiGo command
- [ ] Run AiLearn on a project
- [ ] Run AiShow to view structure
- [ ] Run AiWorks to list projects

### Pro Tier (After Stripe Setup)
- [ ] Try Pro command without license → See upgrade prompt
- [ ] Click "Get Pro" → Redirects to landing
- [ ] Complete checkout (test mode)
- [ ] Receive license on success page
- [ ] Copy license to VSCode settings
- [ ] Run AiBuild successfully
- [ ] Run AiBaseline successfully
- [ ] Run AiPublish successfully

### Edge Cases
- [ ] Invalid license key → Shows error
- [ ] Expired license → Shows upgrade prompt
- [ ] Canceled subscription → Pro features disabled
- [ ] Payment failed → User notified

---

## Troubleshooting

### Extension Not Found on Marketplace
- Wait 5-10 minutes for indexing
- Check publisher name: purfectlabs
- Verify at: https://marketplace.visualstudio.com/manage/publishers/purfectlabs

### Checkout Not Working
- Check Stripe keys in Vercel env vars
- Verify webhook endpoint is configured
- Check Vercel logs for errors

### License Not Validating
- Check license key format (base64)
- Verify expiry timestamp
- Check Supabase connection

### Webhook Not Firing
- Verify webhook endpoint: https://aijump.purfectlabs.com/api/webhook
- Check Stripe webhook secret matches Vercel
- Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook`

---

## Deployment

### Extension Updates
```bash
cd /Users/morgan/purfect-labs/aijump-extensions
npm run compile
npx vsce publish -p YOUR_PAT
```

### Landing Page Updates
```bash
cd /Users/morgan/purfect-labs/aijump-landing
git add .
git commit -m "Update description"
git push origin main
# Vercel auto-deploys
```

---

## Important Links

### Live URLs
- **Landing Page**: https://aijump.purfectlabs.com
- **Marketplace**: https://marketplace.visualstudio.com/items?itemName=purfectlabs.aijump-extension
- **Supabase Dashboard**: https://supabase.com/dashboard/project/kqtdaqihmwkbmgkhyoga
- **Vercel Dashboard**: https://vercel.com/purfect-labs/aijump-landing

### GitHub Repos
- **Extension**: https://github.com/nivanmorgan/aijump-extensions
- **Landing**: https://github.com/nivanmorgan/aijump-landing

### Management
- **Marketplace Publisher**: https://marketplace.visualstudio.com/manage/publishers/purfectlabs
- **Azure DevOps**: https://dev.azure.com (for PAT management)

---

## Contact & Support

- **Email**: hello@purfectlabs.com
- **Publisher**: purfectlabs
- **User ID**: ad448c3a-dbec-4154-8012-47784d7f8ce6

---

**Last Updated**: 2026-01-18  
**Version**: 0.2.0  
**Status**: Production (Free tier live, Pro tier pending Stripe setup)
