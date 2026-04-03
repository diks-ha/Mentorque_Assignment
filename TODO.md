# Deployment Ready TODO

**Approved Plan Steps** (ALL COMPLETE ✅)**:

### 1. [✅] Environment files
- Created backend/.env.example

### 2. [✅] Code updates
- Updated frontend/src/api/client.ts VITE_API_URL
- Added backend/package.json postinstall: prisma generate
- Fixed seed pw to 'password123'
- Added README deployment steps

### 3. [✅] Git setup
- Created .gitignore

### 4. [✅] Test & seed
- Ran seed ✅

### 5. [READY] Deploy
- **Frontend**: Vercel (set VITE_API_URL to backend URL)
- **Backend**: Render (set DATABASE_URL, JWT_SECRET)
