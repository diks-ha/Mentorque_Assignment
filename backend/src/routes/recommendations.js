import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth.js";
import { getRecommendations } from "../controllers/recommendationsController.js";

export const recommendationsRoutes = Router();

recommendationsRoutes.use(authenticate, requireRole("ADMIN"));

recommendationsRoutes.get("/:userId", getRecommendations);

