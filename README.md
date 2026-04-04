# Mentoring Call Scheduling Platform

## Quick Start (Local)

1. **Backend** (5001):
```
cd backend
npm install
prisma db push
node src/scripts/seedData.js
npm run dev
```

2. **Frontend** (5173):
```
cd frontend
npm install
npm run dev
```

3. **Test**:
- Open http://localhost:5173
- Login: admin@example.com / admin123 (admin)
- Or user1@mentoring.com / user123 (user)

## Features
- RBAC: User (avail/tags), Mentor (avail), Admin (users/recs/book calls)
- Recs: Tag + desc similarity
- Calls: Resume/Job/Mock + overlap check
- DB: PostgreSQL + Prisma

## Deploy Instructions

### Backend (Railway)
**Build Command**: `prisma generate`
**Start Command**: `npm start`
1. Fork repo
2. Railway: `New Project` → GitHub → Backend folder
3. Railway Variables:
```
DATABASE_URL=postgresql://... (NeonDB)
JWT_SECRET=your-super-secret-key-min-32-chars
```
4. CLI: `railway run prisma migrate deploy`
5. CLI: `railway run node src/scripts/seedData.js`
6. Done → Railway URL

**Render**:
- Build: `npm install && prisma generate`
- Start: `npm start`
- Env: DATABASE_URL, JWT_SECRET

### Frontend (Vercel)
**Build**: `npm run build`
**Output**: `dist`
**Start**: `npm run preview`
1. Vercel Import Frontend
2. Env: `VITE_API_URL=https://backend.railway.app`
3. Deploy

### NeonDB (Recommended)
1. neon.tech → Create project → Postgres → Copy URL
2. Backend .env DATABASE_URL=neon-url

Test: frontend.vercel.app → admin@example.com/admin123

### Frontend (Vercel/Netlify)
1. Fork repo
2. Vercel: Import GitHub → Frontend
3. Add var:
```
VITE_API_URL=https://your-backend.railway.app
```
4. Deploy: https://your-app.vercel.app

### Supabase (DB)
1. New project
2. Copy DATABASE_URL from Settings
3. Paste backend .env
4. `prisma db push` / migrate deploy

**Test**: https://frontend.vercel.app → admin@example.com / admin123

**Production**:
- JWT_SECRET 64+ chars
- NeonDB (serverless Postgres)
- Railway/Vercel auto-deploy

## Test Creds
- Admin: admin@example.com/admin123
- User: user1@mentoring.com/user123
- Mentor: mentor1@mentoring.com/mentor123

## APIs
- POST /auth/login (email/pass → JWT)
- GET /users (admin), /mentors
- GET /recommendations/:userId
- POST /book-call
- /availability/weekly, /overlap
