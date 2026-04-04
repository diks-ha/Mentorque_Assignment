import { prisma } from "../lib/prisma.js";
import { requireRole, authenticate } from "../middleware/auth.js";

export async function bookCall(req, res, next) {
    try {
        const { userId, mentorId, callType, scheduledTime } = req.body;
        const adminId = req.userId; // or createdByAdmin true

        if (!userId || !mentorId || !callType || !scheduledTime) {
            return res.status(400).json({ error: "userId, mentorId, callType, scheduledTime required" });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        const mentor = await prisma.user.findUnique({ where: { id: mentorId } });
        if (!user || user.role !== "USER") return res.status(404).json({ error: "User not found" });
        if (!mentor || mentor.role !== "MENTOR") return res.status(404).json({ error: "Mentor not found" });

        const start = new Date(scheduledTime);
        const end = new Date(start.getTime() + 30 * 60 * 1000); // assume 30min

        // Check user availability overlap
        const userAvail = await prisma.availability.findFirst({
            where: {
                userId,
                role: "USER",
                startTime: { lt: end },
                endTime: { gt: start }
            }
        });
        if (!userAvail) return res.status(400).json({ error: "No user availability for this time" });

        // Check mentor availability overlap
        const mentorAvail = await prisma.availability.findFirst({
            where: {
                mentorId,
                role: "MENTOR",
                startTime: { lt: end },
                endTime: { gt: start }
            }
        });
        if (!mentorAvail) return res.status(400).json({ error: "No mentor availability for this time" });

        // Check no existing call overlap
        const existingCall = await prisma.call.findFirst({
            where: {
                OR: [
                    { userId },
                    { mentorId }
                ],
                scheduledTime: { lt: end },
                OR: [
                    { scheduledTime: { gt: start } },
                    // end time not in model, assume fixed duration or add endTime later
                ]
            }
        });
        if (existingCall) return res.status(400).json({ error: "Time conflict with existing call" });

        const call = await prisma.call.create({
            data: {
                userId,
                mentorId,
                callType,
                scheduledTime: start,
                status: "PENDING",
                createdByAdmin: true
            },
            include: {
                user: { select: { name: true } },
                mentor: { select: { name: true } }
            }
        });

        res.status(201).json(call);
    } catch (e) {
        next(e);
    }
}

export async function listCalls(req, res, next) {
    try {
        const { userId, mentorId } = req.query;
        const where = {};
        if (userId) where.userId = userId;
        if (mentorId) where.mentorId = mentorId;

        const calls = await prisma.call.findMany({
            where,
            include: {
                user: { select: { name: true, role: true } },
                mentor: { select: { name: true, role: true } }
            },
            orderBy: { scheduledTime: "desc" }
        });
        res.json(calls);
    } catch (e) {
        next(e);
    }
}

