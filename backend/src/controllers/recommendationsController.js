import { prisma } from "../lib/prisma.js";
import { requireRole, authenticate } from "../middleware/auth.js";

export async function getRecommendations(req, res, next) {
    try {
        const { userId } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                userTags: {
                    include: { tag: true }
                }
            }
        });
        if (!user || user.role !== "USER") {
            return res.status(404).json({ error: "User not found" });
        }

        const userTags = new Set(user.userTags.map(ut => ut.tag.name));
        const userDescWords = user.description ? new Set(user.description.toLowerCase().match(/\b\w{3,}\b/g) || []) : new Set();

        const mentors = await prisma.user.findMany({
            where: { role: "MENTOR" },
            include: {
                mentorTags: {
                    include: { tag: true }
                }
            }
        });

        const recs = mentors.map(m => {
            const mentorTags = m.mentorTags.map(mt => mt.tag.name);
            const intersectionTags = mentorTags.filter(t => userTags.has(t)).length;
            const unionTags = new Set([...Array.from(userTags), ...mentorTags]).size;
            const tagScore = unionTags > 0 ? (intersectionTags / unionTags) * 100 : 0;

            const mentorDescWords = m.description ? new Set(m.description.toLowerCase().match(/\b\w{3,}\b/g) || []) : new Set();
            const intersectionDesc = Array.from(userDescWords).filter(w => mentorDescWords.has(w)).length;
            const unionDesc = new Set([...Array.from(userDescWords), ...Array.from(mentorDescWords)]).size;
            const descScore = unionDesc > 0 ? (intersectionDesc / unionDesc) * 100 : 0;

            const score = Math.round(tagScore * 0.6 + descScore * 0.4);

            return {
                id: m.id,
                name: m.name,
                description: m.description || '',
                tags: mentorTags,
                score
            };
        }).sort((a, b) => b.score - a.score);

        res.json(recs.slice(0, 10)); // top 10
    } catch (e) {
        next(e);
    }
}

