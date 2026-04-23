# Kusang Lhamo - CMS Portfolio

This project now uses a real backend CMS flow:

- Public projects come from MongoDB via FastAPI APIs.
- Admin panel creates/updates/deletes projects through authenticated endpoints.
- Contact form messages are stored in MongoDB and visible in admin.
- Admin can store a per-project 3D object URL.
- No `mockData.js` and no localStorage project storage.

## Stack

- Frontend: React (CRA + CRACO, Tailwind)
- Backend: FastAPI
- Database: MongoDB (Motor)
- Free hosting path: Vercel + Render + MongoDB Atlas

## CMS Data Storage

- `projects` collection: all portfolio project content.
- `contact_messages` collection: contact form submissions.
- Admin JWT token is stored in browser localStorage key `adminToken`.
- Admin username/password are read from backend environment variables.

## Image Safety (to avoid layout conflicts)

- Thumbnail images are displayed at 4:3 ratio.
- Hero images are displayed at 16:9 ratio.
- Backend validates image URLs and 3D URL as valid `http/https`.
- Recommended: upload/crop media near the display ratio to avoid aggressive cropping.

## Backend Environment Variables

Set these in `backend/.env` locally and Render in production:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=kusang_lhamo
JWT_SECRET=change-me
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me
CORS_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
```

## Run Locally

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend

```bash
cd frontend
yarn install
yarn start
```

Optional frontend env (`frontend/.env`):

```env
REACT_APP_API_URL=http://localhost:8000
```

## Seed Initial Projects (Optional)

You can insert starter projects into MongoDB once:

```bash
cd backend
python3 scripts/seed_projects.py
```

Seed source file:

- `backend/seed/projects.seed.json`

You can edit this file and run the seed script again. Existing entries are updated by `title + year`.

## API Overview

### Public

- `GET /api/health`
- `GET /api/projects` (published only)
- `GET /api/projects/{id}`

### Admin (JWT required)

- `POST /api/admin/login`
- `GET /api/admin/me`
- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/{id}`
- `DELETE /api/admin/projects/{id}`

## Deploy (Free Tier)

### MongoDB Atlas

- Create free cluster and user.
- Add network access.
- Copy connection string to `MONGO_URL`.

### Render (Backend)

- Root directory: `backend`
- Build command:

```bash
pip install -r requirements.txt
```

- Start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

- Set backend env vars listed above.
- Render example backend URL:
  - `https://your-backend.onrender.com`

 ### Vercel (Frontend)

- Root directory: `frontend`
- Install: `yarn install`
- Build: `yarn build`
- Output: `build`
- Set `REACT_APP_API_URL` to your Render backend URL.

## Vite Note

- The current frontend is CRA + CRACO and is deployable now.
- If you later migrate to Vite, keep the same backend/database; only frontend build tooling changes.
- On Vite, frontend env variable becomes `VITE_API_URL` instead of `REACT_APP_API_URL`.

## Security Notes

- Admin JWT expires in 60 minutes.
- Frontend clears expired/invalid token automatically.
- Keep `JWT_SECRET` strong in production.
- Restrict `CORS_ORIGINS` to your real frontend domain(s).
