# 🧑‍🏫 Mentor Call Scheduling System

[![Frontend](https://img.shields.io/badge/Frontend-React+Vite+Tailwind-blue)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Express+Prisma-green)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-Postgres(Prisma)-orange)](https://prisma.io/)

Full-stack platform where **Users** get mentorship, **Mentors** share expertise, **Admin** matches & books calls (no self-booking).

## ✨ Features
- 🔐 JWT Authentication + RBAC (User/Mentor/Admin)
- 🏷️ Tag-based recommendation system (intersection score)
- 📅 Availability overlap detection & auto-slot booking (60min)
- 📱 Responsive Tailwind UI dashboards per role
- 🗃️ Prisma ORM + Postgres (NeonDB ready)
- 🌱 Dummy data seeded (10 users, 5 mentors, 1 admin)

### Users can:
- Add tags/description (problem)
- Manage availability

### Mentors can:
- Manage availability

### Admin can:
- View users/mentors
- Get recs for users
- Book calls on overlap

## 🚀 Quick Start (Local)

### 1. Database (NeonDB free)
1. [neon.tech](https://neon.tech) → Sign up → New project
2. Copy **Connection String** → `backend/.env`:
```
DATABASE_URL=\"postgresql://user:pass@host/db?sslmode=require\"
JWT_SECRET=\"your-secret-key\"
```

### 2. Backend
```bash
cd backend
npm install
npx prisma db push
npx prisma db seed  # pw: password123
npm run dev  # :5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev  # :3000
```

**Login**: `dikshamall853@gmail.com` / `password123` or `mentor1@test.com` / `password123`

## ☁️ Production Deployment

### Backend (Render.com)
1. Push backend/ to GitHub repo.
2. New Web Service → GitHub repo → Node.
3. **Environment vars**:
   - `DATABASE_URL` (Neon/Render Postgres)
   - `JWT_SECRET`
4. Build: `npm install`
5. Start: `npm run start`
6. Run once: `npx prisma db push && npx prisma db seed`

### Frontend (Vercel)
1. Push frontend/ to GitHub repo.
2. Import to Vercel → auto-deploy.
3. **Environment var**:
   - `VITE_API_URL` = `https://your-render-app.onrender.com/api`
4. Auto-builds with `npm run build`.

**Note**: Use separate repos for frontend/backend for easy deploys.

## 📁 Structure
```
.
├── backend/
├── frontend/
├── .gitignore
├── TODO.md
├── .env.example (backend)
└── README.md
```

## 🔮 API Endpoints
| Method | Endpoint | Role | Desc |
|--------|----------|------|------|
| POST | /api/auth/login | public | login |
| GET | /api/users | admin | list users |
| GET | /api/mentors | admin | list mentors |
| GET/POST | /api/availability | self | manage |
| GET | /api/recommendations/:userId | admin | recs |
| GET/POST | /api/calls | admin | list/book |

## 🤝 Contributing
Fork & PR

## 📄 License
MIT
