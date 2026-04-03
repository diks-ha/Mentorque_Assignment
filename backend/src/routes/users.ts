import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireRole } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/users', requireRole(['ADMIN']), async (req, res) => {
    const users = await prisma.user.findMany({
        where: { role: 'USER' },
        select: { id: true, name: true, email: true, tags: true, description: true }
    });
    res.json(users);
});

router.get('/mentors', requireRole(['ADMIN']), async (req, res) => {
    const mentors = await prisma.user.findMany({
        where: { role: 'MENTOR' },
        select: { id: true, name: true, email: true, tags: true }
    });
    res.json(mentors);
});

export default router;

