# Study Abroad CRM

Full-stack CRM for managing study-abroad students applying to the USA, Canada, and New Zealand.

**API-first build**: all backend modules are being built and verified (via curl/Swagger) before frontend
work resumes. There is currently no authentication layer — every endpoint is open. Remaining modules
(Timeline, Calendar, Tasks, Notifications, Payments, Universities, Scholarships, AI Assistant, OCR,
Student/Parent Portals, Settings, Audit Logs, tests, CI) are built incrementally — see
`MASTER_PROMPT_Study_Abroad_CRM.md` for the full spec.

## Stack

- **Backend**: Node.js, Express, TypeScript, MongoDB + Mongoose, Zod validation, Multer (file uploads),
  Swagger/OpenAPI, Helmet/CORS/rate-limiting.
- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS v4, React Router, TanStack Query, Axios.
- **DevOps**: Docker, Docker Compose.

## Project layout

```
backend/
  src/
    config/        env, db, logger, swagger
    middleware/     validate, error handling
    modules/
      students/      Student model, CRUD, search & filters, dynamic kanban stage
      dashboard/     aggregate stats
      kanban/        board columns, reorder, move-student (drag & drop)
      workflow/      dynamic workflow templates + per-student step progress
      forms/         dynamic form builder templates + per-student submissions
      checklists/    country-specific checklist templates + per-student progress
      documents/     upload (Multer), versioning, rename, delete, download
    routes/         API route aggregator
    shared/         errors, utils
frontend/
  src/
    features/
      students/      students list page + add-student modal
      dashboard/
    components/layout/  dashboard shell (sidebar/topbar)
    lib/            axios client
```

## Getting started (local dev)

### Backend

```
cd backend
cp .env.example .env
npm install
npm run dev             # http://localhost:5000, Swagger at /api-docs
```

Requires a running MongoDB instance (local or via `docker compose up mongo`).

### Frontend

```
cd frontend
npm install
npm run dev             # http://localhost:5173, proxies /api to :5000
```

### With Docker Compose

```
docker compose up --build
```

Brings up MongoDB, backend (port 5000), and frontend served via Nginx (port 5173).

## API

- `GET/POST /api/students`, `GET/PUT/DELETE /api/students/:id`
- `GET /api/dashboard/summary`
- `GET/POST /api/kanban/columns`, `PUT /api/kanban/columns/reorder`, `PATCH /api/kanban/students/:id/move`
- `GET/POST/PUT/DELETE /api/workflows`, assign/progress endpoints under `/api/workflows/...`
- `GET/POST/PUT/DELETE /api/forms`, submission endpoints under `/api/forms/...`
- `GET/POST/DELETE /api/checklists`, assign/progress endpoints under `/api/checklists/...`
- `GET/POST /api/documents/students/:studentId`, `PATCH/DELETE /api/documents/:id`, `GET /api/documents/:id/download`
- Swagger UI: `GET /api-docs`
