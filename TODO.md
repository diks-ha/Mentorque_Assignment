# Mentoring Call Scheduling Platform TODO

## Approved Plan Summary
Convert availability tracker to Mentoring platform with RBAC (User/Mentor/Admin). Remove Google OAuth/Calendar. Add tags, descriptions, calls schema. Simple tag-based recommendations. Role-specific logins/dashboards.

Current Progress: 6/28 steps complete.

## Backend (15 steps)
- [x] 1. Update prisma/schema.prisma: Add Tags, UserTags, MentorTags, Calls models; add User.description; remove googleRefreshToken.
- [x] 2. Delete Google files: controllers/googleAuthController.js, routes/googleAuth.js, google.routes.js, utils/googleClient.js, services/googleCalendar.js. (Removed usages; files left inert)
- [x] 3. Edit controllers/authController.js: Remove google fields from select/me.
- [ ] 4. Edit middleware/auth.js: Simplify (remove MAIN_SITE_JWT_SECRET/SSO if unused).
- [x] 5. Edit index.js: Remove googleRouter import/use.
- [x] 6. Edit routes/auth.js: Remove googleOAuthRoutes.
- [ ] 7. Edit controllers/adminController.js & meetingController.js: Remove Google/Meet logic.
- [ ] 8. Update backend/package.json: Remove googleapis, uuid (if unused).
- [ ] 9. Create controllers/usersController.js: GET /users (admin), GET /mentors.
- [x] 10. Create controllers/recommendationsController.js: GET /recommendations/:userId (tag overlap + desc similarity).
- [ ] 11. Enhance controllers/availabilityController.js: Add GET /overlap?userId&mentorId.
- [x] 12. Create controllers/callsController.js: POST /book-call, GET /calls?
- [ ] 13. Create routes/users.js, recommendations.js, calls.js; mount in index.js.
- [x] 14. Create seedData.js: 10 users, 5 mentors (tags/desc), 1 admin.
- [ ] 15. Run: prisma migrate dev --name mentoring_schema; prisma generate; npm i.

## Frontend (12 steps)
- [ ] 16. Update src/api/auth.js: Remove Google calls.
- [ ] 17. Create src/api/users.js, recommendations.js, calls.js, overlap endpoint.
- [ ] 18. Copy Login.jsx to login/UserLogin.jsx, MentorLogin.jsx, AdminLogin.jsx (pre-set role).
- [ ] 19. Update App.jsx: Add routes /login/user|mentor|admin.
- [ ] 20. Create/enhance UserDashboard.jsx: availability + tags/desc.
- [ ] 21. Create MentorDashboard.jsx: availability.
- [ ] 22. Enhance AdminDashboard.jsx: users/mentors/recs/overlap/book calls.
- [ ] 23. Update AuthContext.jsx: Role-specific login (pass role).
- [ ] 24. Frontend/package.json: No major changes.
- [ ] 25. Create .env.local: VITE_API_URL=http://localhost:5000.

## Setup & Test (1 step)
- [ ] 26. Docs: README.md with env vars, run instructions (prisma migrate/deploy, seed, npm dev both).

## Completion
- [ ] 27. Test all roles/APIs/UI.
- [ ] 28. attempt_completion with instructions.

**Next step: Edit middleware/auth.js (step 4), then adminController/meeting (step 7).**

