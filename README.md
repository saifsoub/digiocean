# DigitalOcean SaaS Starter

A production-focused Next.js SaaS starter with:

- NextAuth authentication (credentials + magic link)
- Forgot password email flow
- Resend email integration
- Stripe billing endpoints (upgrade/cancel management portal)
- DigitalOcean Spaces pre-signed uploads
- Prisma ORM + PostgreSQL schema
- DigitalOcean GradientAI inference proxy endpoint
- Material UI frontend
- Admin dashboard and agents control room UI
- One-click deploy manifest for DigitalOcean App Platform

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy env template and set values:

   ```bash
   cp .env.example .env
   ```

3. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

4. Run locally:

   ```bash
   npm run dev
   ```

## Deploy to DigitalOcean App Platform

Use `.do/app.yaml` for app spec and `.do/deploy.template.yaml` for one-click deploy template wiring.
