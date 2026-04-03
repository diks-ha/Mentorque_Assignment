import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireRole } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:userId', requireRole(['ADMIN']), async (req, res) => {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { tags: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const mentors = await prisma.user.findMany({
        where: { role: 'MENTOR' },
        select: { id: true, name: true, tags: true }
    });

    const userTags = new Set(user.tags as string[]);
    const recs = mentors.map((m: any) => {
        const mentorTags = new Set(m.tags as string[]);
        const intersection = new Set([...userTags].filter(t => mentorTags.has(t)));
        const score = intersection.size / Math.max(mentorTags.size, 1);
        return { ...m, score, matchingTags: Array.from(intersection) };
    }).sort((a: any, b: any) => b.score - a.score).slice(0, 5);

    res.json(recs);
});

export default router;

