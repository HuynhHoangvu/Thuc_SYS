# Study Abroad CRM

Full-stack CRM for managing study-abroad students applying to the USA, Canada, and New Zealand.

There is currently no authentication layer — every endpoint is open. See
`MASTER_PROMPT_Study_Abroad_CRM.md` for the full spec.

## Stack

- **Next.js 16** (App Router) — single project for both the UI and the API (Route Handlers under `src/app/api`).
- **React 19**, TypeScript, Tailwind CSS v4, TanStack Query, Radix UI, React Hook Form + Zod.
- **Prisma 7** with the `@prisma/adapter-pg` driver adapter, **PostgreSQL** hosted on **Neon**.
- **Vercel Blob** for document/file storage (documents feature).
- Deploys to **Vercel** as one project.

## Project layout

```
prisma/
  schema.prisma        Student, Todo, ChecklistTemplate/Progress, FormTemplate/Submission,
                        WorkflowTemplate/Progress, StudentDocument
src/
  app/
    api/                Route Handlers: students, checklists, forms, workflows, documents, dashboard
    (dashboard)/         students, templates pages behind the shared dashboard shell
  components/layout/     DashboardLayout (sidebar/topbar)
  features/               ported client feature components (students, checklists, forms, workflow, documents, templates)
  lib/                    prisma client, axios client, per-module DTO/validation + mapping to Prisma models
```

Note: the original Kanban board module was intentionally dropped — student stage is now just an
editable field (`StageSelect`) on the student list/profile, backed by a static stage list
(`src/features/students/stages.ts`) instead of a dynamic columns table.

## Getting started (local dev)

```
npm install
cp .env.example .env     # set DATABASE_URL (Neon) and BLOB_READ_WRITE_TOKEN
npx prisma generate
npx prisma migrate dev   # only needed when the schema changes
npm run dev              # http://localhost:3000
```

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Set environment variables in the Vercel project: `DATABASE_URL` (Neon pooled connection string)
   and `BLOB_READ_WRITE_TOKEN` (enable Vercel Blob storage for the project to get this automatically).
3. Vercel auto-detects Next.js — no extra build config needed. `prisma generate` runs via the
   `postinstall` hook (add one if you fork this) or as part of `next build`.

## API

All routes live under `/api` and are same-origin with the frontend (no CORS needed):

- `GET/POST /api/students`, `GET/PUT/DELETE /api/students/:id`, todos under `/api/students/:id/todos`
- `GET /api/dashboard/summary`
- `GET/POST/DELETE /api/checklists`, assign/progress endpoints under `/api/checklists/...`
- `GET/POST/PUT/DELETE /api/forms`, submission endpoints under `/api/forms/...`
- `GET/POST/PUT/DELETE /api/workflows`, assign/progress endpoints under `/api/workflows/...`
- `GET/POST /api/documents/students/:studentId`, `PATCH/DELETE /api/documents/:id`, `GET /api/documents/:id/download`
