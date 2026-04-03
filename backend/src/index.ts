import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
const usersRouter: any = require('./routes/users').default || require('./routes/users');
const availabilityRouter: any = require('./routes/availability').default || require('./routes/availability');
const recommendationsRouter: any = require('./routes/recommendations').default || require('./routes/recommendations');
const callsRouter: any = require('./routes/calls').default || require('./routes/calls');
import { verifyToken } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', verifyToken, usersRouter);
app.use('/api', verifyToken, availabilityRouter);
app.use('/api', verifyToken, recommendationsRouter);
app.use('/api', verifyToken, callsRouter);

app.get('/', (req, res) => res.send('Mentorship Backend Ready'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;

