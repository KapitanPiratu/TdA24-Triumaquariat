import prisma from '@/prisma/client';

export default defineEventHandler((event) => {
    const lecturers = prisma.lecturer.findMany({
        include: {
            tags: true,
            contact: {
                include: {
                    emails: true,
                    telephone_numbers: true
                }
            }
        }
    });

    return lecturers;
})