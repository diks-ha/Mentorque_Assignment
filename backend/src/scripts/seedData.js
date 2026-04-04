import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
    await prisma.call.deleteMany({});
    await prisma.mentorTag.deleteMany({});
    await prisma.userTag.deleteMany({});
    await prisma.availability.deleteMany({});
    await prisma.meetingParticipant.deleteMany({});
    await prisma.meeting.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.tag.deleteMany({});

    // Tags
    const tagData = [
        { name: "big-tech", id: uuidv4() },
        { name: "faang", id: uuidv4() },
        { name: "resume", id: uuidv4() },
        { name: "interview", id: uuidv4() },
        { name: "communication", id: uuidv4() },
        { name: "software", id: uuidv4() },
        { name: "startup", id: uuidv4() },
        { name: "leadership", id: uuidv4() },
        { name: "guidance", id: uuidv4() },
        { name: "domain-expert", id: uuidv4() }
    ];

    for (const tag of tagData) {
        await prisma.tag.upsert({
            where: { name: tag.name },
            update: {},
            create: tag
        });
    }

    const tags = await prisma.tag.findMany({ select: { id: true, name: true } });

    // Admin
    const adminPass = await bcrypt.hash("di23ks67ha", 12);
    await prisma.user.upsert({
        where: { email: "dikshamall853@gmail.com" },
        update: { role: "ADMIN" },
        create: {
            id: uuidv4(),
            name: "Platform Admin",
            email: "dikshamall853@gmail.com",
            password: adminPass,
            role: "ADMIN",
            timezone: "UTC",
            description: "Admin user for scheduling"
        }
    });

    // 10 Users
    const userNames = [
        "John Doe", "Jane Smith", "Bob Johnson", "Alice Brown", "Charlie Davis",
        "Diana Evans", "Eve Wilson", "Frank Miller", "Grace Lee", "Henry Taylor"
    ];

    for (let i = 0; i < 10; i++) {
        const pass = await bcrypt.hash("user123", 12);
        const user = await prisma.user.create({
            data: {
                id: uuidv4(),
                name: userNames[i],
                email: `user${i + 1}@mentoring.com`,
                password: pass,
                role: "USER",
                timezone: "UTC",
                description: `User ${i + 1} - software engineer seeking career guidance. Interests: interviews, resume.`
            }
        });

        // 1-3 tags
        const numTags = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < numTags; j++) {
            const tagId = tags[Math.floor(Math.random() * tags.length)].id;
            await prisma.userTag.upsert({
                where: { userId_tagId: { userId: user.id, tagId } },
                update: {},
                create: {
                    userId: user.id,
                    tagId
                }
            });
        }
    }

    // 5 Mentors
    const mentorData = [
        {
            name: "Tech Lead @ Google",
            email: "mentor1@mentoring.com",
            desc: "10+ years Big Tech experience. Expert in resume revamp and system design interviews.",
            tags: ["big-tech", "faang", "resume", "interview"]
        },
        {
            name: "Communication Coach",
            email: "mentor2@mentoring.com",
            desc: "Helped 100+ candidates land jobs through mock interviews and communication skills.",
            tags: ["interview", "communication", "guidance"]
        },
        {
            name: "Startup Founder",
            email: "mentor3@mentoring.com",
            desc: "Built and sold startups. Advice on entrepreneurship and job market trends.",
            tags: ["startup", "guidance", "leadership"]
        },
        {
            name: "Senior Software Engineer",
            email: "mentor4@mentoring.com",
            desc: "Domain expert in software engineering. Mock interviews for mid-senior roles.",
            tags: ["software", "domain-expert", "interview"]
        },
        {
            name: "Career Mentor",
            email: "mentor5@mentoring.com",
            desc: "Job market guidance, resume reviews, and networking strategies.",
            tags: ["resume", "guidance", "communication"]
        }
    ];

    for (const mData of mentorData) {
        const pass = await bcrypt.hash("mentor123", 12);
        const mentor = await prisma.user.create({
            data: {
                id: uuidv4(),
                name: mData.name,
                email: mData.email,
                password: pass,
                role: "MENTOR",
                timezone: "UTC",
                description: mData.desc
            }
        });

        // tags
        for (const tagName of mData.tags) {
            const tag = tags.find(t => t.name === tagName);
            if (tag) {
                await prisma.mentorTag.upsert({
                    where: { mentorId_tagId: { mentorId: mentor.id, tagId: tag.id } },
                    update: {},
                    create: {
                        mentorId: mentor.id,
                        tagId: tag.id
                    }
                });
            }
        }

        // Add availability Mon-Thu 10-11, 14-15 this week
        const now = new Date();
        for (let dayOffset = 1; dayOffset <= 4; dayOffset++) {
            const date = new Date(now);
            date.setDate(now.getDate() + dayOffset);
            date.setHours(0, 0, 0, 0);
            const slots = [
                { start: "10:00", end: "11:00" },
                { start: "14:00", end: "15:00" }
            ];
            for (const slot of slots) {
                const startTime = new Date(date);
                const [h, m] = slot.start.split(':').map(Number);
                startTime.setUTCHours(h, m, 0, 0);
                const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
                await prisma.availability.create({
                    data: {
                        id: uuidv4(),
                        mentorId: mentor.id,
                        role: "MENTOR",
                        date,
                        startTime: startTime,
                        endTime: endTime
                    }
                });
            }
        }
    }

    console.log("✅ Seeded database: 1 admin, 10 users, 5 mentors with tags & availability");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

