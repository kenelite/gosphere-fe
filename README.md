## GoSphere Frontend (gosphere-fe)

Lightweight web console for the Kubernetes-based microservices PaaS. This is the frontend for the backend service described in the repository: `gosphere-backend`.

Backend reference: [kenelite/gosphere-backend](https://github.com/kenelite/gosphere-backend)

### Tech Stack
- React 18 + TypeScript
- Vite 5
- React Router 6
- Axios

### Getting Started
1. Install dependencies
```bash
npm install
```

2. Configure environment variables
Create a `.env` file in the project root (or export in shell):
```bash
VITE_API_BASE_URL=http://localhost:8080/api
```
If omitted, the app defaults to `/api` which works with a reverse proxy that forwards to the backend.

3. Start the dev server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
npm run preview
```

### Available Scripts
- `npm run dev`: Start Vite dev server
- `npm run build`: Type-check and build production assets
- `npm run preview`: Preview the production build locally

### Features & Pages
- Tenants
  - List, create, delete tenants
  - API: `GET/POST/DELETE /api/v1/tenants` and `/api/v1/tenants/:id`
- Deploy
  - Canary traffic weight
  - Swimlane via request header
  - Blue-Green: switch Ingress backend
  - APIs: `POST /api/v1/deploy/canary/weight`, `POST /api/v1/deploy/swimlane/header`, `POST /api/v1/deploy/bluegreen/switch`
- Autoscaling
  - HPA by target CPU utilization
  - VPA (CRD) update mode and target
  - APIs: `POST /api/v1/autoscaling/hpa`, `POST /api/v1/autoscaling/vpa`
- Harbor Gate
  - Trigger Harbor vulnerability gate sync integrated with Argo CD
  - API: `POST /api/v1/cicd/harbor-gate-sync`

### Project Structure
- `src/lib/api.ts`: Axios instance and typed API functions
- `src/ui/AppLayout.tsx`: Top navigation and layout
- `src/router.tsx`: Routes mapping to pages
- `src/tenants/*`: Tenants page
- `src/deploy/*`: Delivery and release operations
- `src/autoscaling/*`: Autoscaling operations
- `src/harbor/*`: Harbor gate operations

### Notes
- Ensure the backend is reachable from the browser and CORS is handled (or use a reverse proxy under `/api`).
- If running the backend on a different host/port, set `VITE_API_BASE_URL` accordingly.