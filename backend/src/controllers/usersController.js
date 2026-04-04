import { prisma } from "../lib/prisma.js";
import { requireRole } from "../middleware/auth.js";

export async function getUsers(req, res, next) {
    try {
        const users = await prisma.user.findMany({
            where: { role: "USER" },
            select: {
                id: true,
                name: true,
                email: true,
                timezone: true,
                createdAt: true,
                description: true
            },
            orderBy: { name: "asc" },
        });
        res.json(users);
    } catch (e) {
        next(e);
    }
}

export async function getMentors(req, res, next) {
    try {
        const mentors = await prisma.user.findMany({
            where: { role: "MENTOR" },
            include: {
                mentorTags: {
                    include: {
                        tag: true
                    }
                }
            },
            orderBy: { name: "asc" },
        });
        // Flatten tags for each mentor
        const mentorsWithTags = mentors.map(m => ({
            ...m,
            tags: m.mentorTags.map(mt => mt.tag.name)
        }));
        res.json(mentorsWithTags);
    } catch (e) {
        next(e);
    }
}

