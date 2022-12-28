// not used during build time.

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// creates fake data in the database in order for testing purposes
async function main(): Promise<void> {
    await prisma.users.create({
        data: {
            firstName: 'Toby',
            lastName: 'Rushton',
            university: 'Oxford University',
            course: 'Computer Science',
            username: 'tobyrushton',
            birthday: '12062005',
            bio: '',
            email: 'temp@email.com',
            settings: {
                create: {},
            },
        },
    })
    await prisma.users.create({
        data: {
            firstName: 'Olivia',
            lastName: 'Rushton',
            university: 'Sheffield University',
            course: 'Financial Mathematics',
            username: 'oliviarushton',
            birthday: '27072002',
            bio: '',
            email: 'temp2@email.com',
            settings: {
                create: {},
            },
        },
    })
    await prisma.users.create({
        data: {
            firstName: 'Toby',
            lastName: 'Rushton',
            university: 'UCL',
            course: 'Computer Science',
            username: 'toby',
            birthday: '2005-06-12',
            bio: '',
            email: 'txbyplayz@gmail.com',
            settings: {
                create: {},
            },
        },
    })
    await prisma.users.create({
        data: {
            firstName: 'Olivia',
            lastName: 'Rushton',
            university: 'Sheffield University',
            course: 'Financial Mathematics',
            username: 'orushton1',
            birthday: '2002-07-27',
            bio: '',
            email: 'Orushton1@sheffield.ac.uk',
            settings: {
                create: {},
            },
        },
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
