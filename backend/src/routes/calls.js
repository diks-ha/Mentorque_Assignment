import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth.js";
import { bookCall, listCalls } from "../controllers/callsController.js";

export const callsRoutes = Router();

callsRoutes.use(authenticate);

callsRoutes.post("/book", requireRole("ADMIN"), bookCall);
callsRoutes.get("/", listCalls);

