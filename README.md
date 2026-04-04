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

## Deploy
**Backend** (Railway/Render):
- .env: DATABASE_URL, JWT_SECRET
- prisma migrate deploy
- node seedData.js

**Frontend** (Vercel):
- .env: VITE_API_URL=your-backend-url

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
