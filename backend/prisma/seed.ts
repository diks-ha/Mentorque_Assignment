import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Clear existing
    await prisma.calls.deleteMany();
    await prisma.availability.deleteMany();
    await prisma.user.deleteMany();

    const hashedPw = await bcrypt.hash('password123', 12);

    // 1 Admin
    await prisma.user.create({
        data: {
            name: 'Diksha',
            email: 'dikshamall853@gmail.com',
            password: hashedPw,
            role: 'ADMIN',
            tags: [],
            description: 'Platform admin',
        },
    });

    // 5 Mentors
    const mentorsData = [
        { name: 'Senior Tech Mentor', email: 'mentor1@test.com', tags: ['Tech', 'Backend', 'Senior', 'BigCompany'] },
        { name: 'DevOps Expert', email: 'mentor2@test.com', tags: ['DevOps', 'Cloud', 'Senior'] },
        { name: 'Frontend Guru', email: 'mentor3@test.com', tags: ['Frontend', 'React', 'UI/UX'] },
        { name: 'Fullstack Pro', email: 'mentor4@test.com', tags: ['Fullstack', 'Tech', 'Node'] },
        { name: 'Career Coach', email: 'mentor5@test.com', tags: ['Career', 'Interviews', 'Tech'] },
    ];

    for (const m of mentorsData) {
        const user = await prisma.user.create({
            data: {
                ...m,
                password: hashedPw,
                role: 'MENTOR',
                description: `Expert in ${m.tags.join(', ')}`,
            },
        });
        await prisma.availability.createMany({
            data: [
                { userId: user.id, date: '2024-10-07', start: '16:00', end: '20:00' },
                { userId: user.id, date: '2024-10-09', start: '14:00', end: '17:00' },
            ],
        });
    }

    // 10 Users
    const usersData = [
        { name: 'John Doe', tags: ['Tech', 'Backend'], description: 'Need backend interview help.' },
        { name: 'Jane Smith', tags: ['Frontend', 'React'], description: 'React performance issues.' },
        { name: 'User3', tags: ['DevOps'], description: 'Cloud deployment.' },
        { name: 'User4', tags: ['Tech', 'Node'], description: 'Node.js optimization.' },
        { name: 'User5', tags: ['Career'], description: 'Interview prep.' },
        { name: 'User6', tags: ['UI/UX'], description: 'Design advice.' },
        { name: 'User7', tags: ['Backend'], description: 'Database design.' },
        { name: 'User8', tags: ['Fullstack'], description: 'Fullstack project.' },
        { name: 'User9', tags: ['Cloud'], description: 'AWS setup.' },
        { name: 'User10', tags: ['Senior'], description: 'Career advice from seniors.' },
    ];

    for (const u of usersData) {
        const user = await prisma.user.create({
            data: {
                name: u.name,
                email: `${u.name.toLowerCase().replace(' ', '.')}@test.com`,
                tags: u.tags,
                password: hashedPw,
                role: 'USER',
                description: u.description,
            },
        });
        await prisma.availability.createMany({
            data: [
                { userId: user.id, date: '2024-10-07', start: '17:00', end: '19:00' },
                { userId: user.id, date: '2024-10-09', start: '15:00', end: '18:00' },
            ],
        });
    }

    console.log('✅ Seeded: 1 admin, 5 mentors, 10 users with availability');
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

