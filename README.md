# Kusang Lhamo - Firebase CMS Portfolio

This project uses a Firebase-only CMS flow (no custom backend required):

- Public projects come from Firestore.
- Admin panel creates/updates/deletes projects in Firestore.
- Contact form messages are stored in Firestore and visible in admin.
- Portfolio views are tracked in Firestore analytics doc.

## Stack

- Frontend: React (CRA + CRACO, Tailwind)
- Auth: Firebase Authentication (Email/Password)
- Database: Firebase Firestore
- Free hosting path: Firebase Spark plan + Vercel

## Firestore Collections

- `projects`: all portfolio project content.
- `contact_messages`: contact form submissions.
- `analytics/portfolio_views`: portfolio view counter.

## Local setup

### 1) Install dependencies

```bash
cd frontend
yarn install
```

### 2) Configure Firebase env

Create `frontend/.env` from `frontend/.env.example`:

```env
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_ADMIN_EMAIL=
```

### 3) Start frontend

```bash
cd frontend
yarn start
```

## Firebase setup (free plan)

1. Create a Firebase project (Spark/free).
2. Enable **Authentication** → Email/Password provider.
3. Create your admin user in Firebase Auth.
4. Create **Firestore Database** (Production or Test mode, then set rules).
5. Add your local and deployed domains to Firebase Auth authorized domains.
6. Apply Firestore rules from `frontend/firestore.rules` (replace admin email first).

## Deploy

### Vercel (Frontend)

- Root directory: `frontend`
- Install: `yarn install`
- Build: `yarn build`
- Output: `build`
- Set all `REACT_APP_FIREBASE_*` variables in Vercel environment.

## Image Safety (to avoid layout conflicts)

- Thumbnail images are displayed at 4:3 ratio.
- Hero images are displayed at 16:9 ratio.
- Admin form uses URL inputs for image fields.
