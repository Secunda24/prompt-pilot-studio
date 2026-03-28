# PromptPilot Studio

PromptPilot Studio is a production-style SaaS demo for AI-assisted creative campaign planning. Version 1 deliberately does **not** call paid LLM, image, or video APIs. Instead, it simulates generation with structured templates, deterministic logic, seeded data, and provider-style service interfaces that are ready for real integrations later.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Lucide icons
- Framer Motion
- React Hook Form + Zod
- TanStack Table
- Recharts
- Supabase-ready schema and seed script

## Build plan and execution rules

The implementation plan and milestone order for PromptPilot Studio live in [`BUILD_PLAN.md`](./BUILD_PLAN.md).

That plan locks in these rules:

- propose milestones before writing feature code
- implement in this order: landing page, app shell and auth, dashboard, campaign builder, storyboard builder, image and video prompt labs, brand visualizer, project library, exports and analytics
- run validation after each milestone and record what was completed
- keep code modular and reusable
- use seeded demo data so the product feels alive immediately
- do not use paid APIs in v1
- keep future AI provider placeholders and service abstractions ready for v2
- keep setup instructions and demo credentials in this README

## What is included

- Premium landing page, pricing page, and contact page
- Demo auth with `admin`, `team_member`, and `viewer` roles
- Protected workspace shell with sidebar, top bar, breadcrumbs, search, notifications, and theme toggle
- Dashboard with KPIs, charts, recent activity, favorite templates, and quick actions
- Campaign builder
- Storyboard builder
- Image prompt lab
- Video prompt lab
- Brand visualizer
- Content calendar generator
- Landing page copy generator
- Prompt pack library
- Project library with archive confirmation flow
- Template library
- Output workspace with multi-tab review
- Export center
- Analytics page
- Settings page
- Integrations page
- Supabase schema with RLS and clean foreign keys
- Seed script for realistic demo data

## Demo credentials

- Admin
  - Email: `admin@promptpilot.studio`
  - Password: `AdminPrompt123!`
- Team Member
  - Email: `team@promptpilot.studio`
  - Password: `TeamPrompt123!`
- Viewer
  - Email: `viewer@promptpilot.studio`
  - Password: `ViewerPrompt123!`

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Update any branding values you want to customize.
3. Install dependencies if you are not reusing the existing workspace dependency cache:

```bash
npm install
```

4. Start the app:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```bash
NEXT_PUBLIC_APP_NAME=PromptPilot Studio
NEXT_PUBLIC_WORKSPACE_NAME=PromptPilot Creative Hub
NEXT_PUBLIC_COMPANY_NAME=PromptPilot
NEXT_PUBLIC_LOGO_PLACEHOLDER=PP
NEXT_PUBLIC_ACCENT_HSL=174 74% 41%
NEXT_PUBLIC_SUPPORT_EMAIL=support@promptpilot.studio
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_TONE=Confident, premium, clear
NEXT_PUBLIC_DEFAULT_PLATFORM=Instagram
NEXT_PUBLIC_DEFAULT_CTA_STYLE=Book a strategy call

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

DEMO_ADMIN_EMAIL=admin@promptpilot.studio
DEMO_ADMIN_PASSWORD=AdminPrompt123!
DEMO_TEAM_EMAIL=team@promptpilot.studio
DEMO_TEAM_PASSWORD=TeamPrompt123!
DEMO_VIEWER_EMAIL=viewer@promptpilot.studio
DEMO_VIEWER_PASSWORD=ViewerPrompt123!
```

## Supabase setup

1. Create a new Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql).
3. Add the three Supabase keys to `.env.local`.
4. Seed the workspace:

```bash
npm run seed:demo
```

The seed script will:

- create the demo workspace
- create or reuse the three demo auth users
- upsert profiles, settings, templates, projects, outputs, packs, exports, notifications, and activity logs

## Architecture notes

- Generation logic lives in [`lib/promptpilot-generator.ts`](./lib/promptpilot-generator.ts)
- Seeded workspace data lives in [`lib/promptpilot-data.ts`](./lib/promptpilot-data.ts)
- Auth and protected-route behavior live in [`lib/promptpilot-auth.ts`](./lib/promptpilot-auth.ts) and [`middleware.ts`](./middleware.ts)
- The mock generation layer exposes a provider-style interface through `PromptPilotGenerator`, so a real AI provider can replace the v1 mock implementation later
- Branding is configurable through cookies today and mirrored in the `settings` table for future persistence
- All v1 generation is deterministic, so the product stays fast and demo-safe

## Key routes

- `/` landing page
- `/pricing`
- `/contact`
- `/login`
- `/signup`
- `/forgot-password`
- `/workspace`
- `/workspace/campaign-builder`
- `/workspace/storyboards`
- `/workspace/image-prompts`
- `/workspace/video-prompts`
- `/workspace/brand-visualizer`
- `/workspace/content-calendar`
- `/workspace/landing-copy`
- `/workspace/prompt-packs`
- `/workspace/projects`
- `/workspace/templates`
- `/workspace/outputs`
- `/workspace/export-center`
- `/workspace/analytics`
- `/workspace/settings`
- `/workspace/integrations`

## Verification

Run a production build:

```bash
npm run build
```
