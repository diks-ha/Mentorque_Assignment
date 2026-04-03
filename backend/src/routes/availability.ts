import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireRole } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const { userId } = (req as any).user!;
    const avail = await prisma.availability.findMany({ where: { userId } });
    res.json(avail);
});

router.post('/', async (req, res) => {
    const { userId } = (req as any).user!;
    const { date, start, end } = req.body;
    const newAvail = await prisma.availability.create({
        data: { userId, date, start, end }
    });
    res.json(newAvail);
});

router.delete('/:id', async (req, res) => {
    const { userId } = (req as any).user!;
    const { id } = req.params;
    await prisma.availability.deleteMany({
        where: { id, userId }
    });
    res.json({ success: true });
});

export default router;

