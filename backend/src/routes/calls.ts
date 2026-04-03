import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireRole } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

function timeToMin(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
}

function minToTime(m: number): string {
    const h = Math.floor(m / 60);
    const min = m % 60;
    return `${h}:${min.toString().padStart(2, '0')}`;
}

function getOverlap(start1: string, end1: string, start2: string, end2: string) {
    const s1 = timeToMin(start1), e1 = timeToMin(end1);
    const s2 = timeToMin(start2), e2 = timeToMin(end2);
    const os = Math.max(s1, s2);
    const oe = Math.min(e1, e2);
    if (os < oe) return { start: minToTime(os), end: minToTime(oe) };
    return null;
}

router.post('/', requireRole(['ADMIN']), async (req, res) => {
    const { userId, mentorId, date } = req.body;
    const userAvails = await prisma.availability.findMany({ where: { userId, date } });
    const mentorAvails = await prisma.availability.findMany({ where: { userId: mentorId, date } });

    let overlap = null;
    for (const ua of userAvails) {
        for (const ma of mentorAvails) {
            overlap = getOverlap(ua.start, ua.end, ma.start, ma.end);
            if (overlap) break;
        }
        if (overlap) break;
    }

    if (!overlap) return res.status(400).json({ error: 'No overlapping availability' });

    // Book at start of overlap for 60min or full overlap
    const bookEnd = Math.min(timeToMin(overlap.end), timeToMin(overlap.start) + 60);
    const bookTime = new Date(`${date}T${overlap.start}:00`);

    const call = await prisma.calls.create({
        data: { userId, mentorId, time: bookTime, status: 'scheduled' }
    });

    res.json(call);
});

router.get('/', async (req, res) => {
    const calls = await prisma.calls.findMany({
        include: { user: { select: { name: true } }, mentor: { select: { name: true } } }
    });
    res.json(calls);
});

export default router;

