# PromptPilot Studio Build Plan

This document records the execution rules and milestone order for building PromptPilot Studio as a premium SaaS demo.

## Execution rules

1. First propose a build plan with milestones before writing code.
2. Implement in this order:
   - landing page
   - app shell and auth
   - dashboard
   - campaign builder
   - storyboard builder
   - image and video prompt labs
   - brand visualizer
   - project library
   - exports and analytics
3. After each milestone, run validation and explain what was completed.
4. Keep code modular and reusable.
5. Use seeded demo data throughout so the app looks alive immediately.
6. Do not use paid APIs in v1.
7. Add placeholders and service abstractions for future AI providers.
8. Include setup instructions and demo credentials in the README.

## Implementation milestones

### Milestone 1: Landing page

Scope:
- Build the hero, feature grid, workflow showcase, output examples, testimonials, FAQ, pricing, contact, and footer experience.
- Make the public site feel like a premium creative-tech product.

Validation:
- Visually confirm `/`, `/pricing`, and `/contact`.
- Check CTA links into the demo app.
- Confirm responsive layout behavior for the marketing shell.

Completed:
- Landing page, pricing page, and contact page were implemented in the App Router marketing segment.
- Public-facing messaging reflects the v1 no-paid-API product position.

### Milestone 2: App shell and auth

Scope:
- Build the protected workspace shell with sidebar, top bar, search, notifications, breadcrumbs, theme handling, and role-aware navigation.
- Add demo-safe auth with `admin`, `team_member`, and `viewer` roles.

Validation:
- Confirm unauthenticated users are redirected away from `/workspace`.
- Confirm demo login flow works for all three roles.
- Confirm protected navigation renders consistently across workspace routes.

Completed:
- Demo auth routes, middleware protection, and role-based viewer helpers were added.
- The shell now provides a realistic SaaS dashboard frame for all major tools.

### Milestone 3: Dashboard

Scope:
- Surface KPI cards, recent activity, favorite templates, output distribution, recent projects, charts, and quick actions.

Validation:
- Confirm seeded metrics render without empty states on first load.
- Confirm charts and tables render from demo data.
- Confirm quick actions point into the core workspace flows.

Completed:
- The dashboard presents seeded activity and analytics immediately.
- Chart cards, recent project surfaces, and quick-action entry points are live.

### Milestone 4: Campaign builder

Scope:
- Build a structured campaign intake form and output generator for concepts, hooks, CTA ideas, pain points, pillars, and UVP summaries.

Validation:
- Confirm the form validates with React Hook Form and Zod.
- Confirm generated outputs change when inputs change.
- Confirm export and copy actions work on generated content.

Completed:
- The campaign builder now turns business briefs into premium structured outputs using the internal generator service.
- Generation remains deterministic and provider-ready.

### Milestone 5: Storyboard builder

Scope:
- Turn campaign ideas into 3-scene, 5-scene, and 10-scene direction outputs with overlays, narration, transitions, and scene goals.

Validation:
- Confirm scene counts and layout render correctly.
- Confirm storyboard variants respond to style, pacing, and tone changes.
- Confirm outputs feel presentation-ready and readable.

Completed:
- The storyboard builder now creates scene-based creative direction for demos and client reviews.
- Scene structures are reusable and driven by the shared generation layer.

### Milestone 6: Image and video prompt labs

Scope:
- Build separate prompt-lab tools for image directions and video-generation prompts without calling live media APIs.

Validation:
- Confirm each lab generates multiple prompt variants.
- Confirm short-form and advanced outputs export cleanly.
- Confirm variation controls create distinct deterministic results.

Completed:
- Image Prompt Lab and Video Prompt Lab are live with polished prompt outputs and alternate directions.
- Both tools are powered by mock generation logic rather than paid APIs.

### Milestone 7: Brand visualizer

Scope:
- Build the strategic brand studio for tone, visual identity, color direction, typography mood, content themes, and brand-safe messaging rules.

Validation:
- Confirm the brand form validates and updates outputs.
- Confirm brand outputs remain consistent with the selected audience and positioning.
- Confirm results can feed other creative modules.

Completed:
- Brand direction, landing copy, and content-planning support now sit behind a reusable strategic generation layer.
- The module behaves like a creative strategist tool rather than a plain form.

### Milestone 8: Project library

Scope:
- Build project browsing, prompt packs, templates, favorites, archive actions, sorting-friendly tables, and reusable workspace library patterns.

Validation:
- Confirm the seeded project list loads with believable client and campaign data.
- Confirm duplicate, archive, favorite, and export actions behave as expected in the demo UI.
- Confirm templates can route users into creation flows.

Completed:
- The project, template, and prompt-pack libraries now make the workspace feel active from first launch.
- Seeded businesses across real estate, accounting, field services, retail, agencies, SaaS, and hospitality are included.

### Milestone 9: Exports and analytics

Scope:
- Build the output workspace, export center, analytics surfaces, settings, and future integration placeholders.

Validation:
- Confirm export preview content renders correctly.
- Confirm analytics charts use seeded usage data.
- Run a production build before considering the milestone complete.

Completed:
- Export center, analytics, settings, and integrations placeholders are implemented.
- Production validation passed with `npm run build`.

## Validation summary

The current implementation has been validated with a successful production build:

```bash
npm run build
```

Additional repo-aligned checks:

- Seeded demo data powers the dashboard, builders, libraries, analytics, and exports immediately.
- The generation service lives in [`lib/promptpilot-generator.ts`](./lib/promptpilot-generator.ts) behind the `PromptPilotGenerator` interface.
- Future persistence and team data are scaffolded in [`supabase/schema.sql`](./supabase/schema.sql) and [`scripts/seed-demo.ts`](./scripts/seed-demo.ts).
- Setup instructions and demo credentials remain documented in [`README.md`](./README.md).
