import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth.js";
import { getUsers, getMentors } from "../controllers/usersController.js";

export const usersRoutes = Router();

usersRoutes.use(authenticate);

usersRoutes.get("/", requireRole("ADMIN"), getUsers);
usersRoutes.get("/mentors", getMentors);

