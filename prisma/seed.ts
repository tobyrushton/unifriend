// not used during build time.

import { PrismaClient } from '@prisma/client'
import { UniversityEmailArray } from '../types'
import { getUniversity } from '../lib/utils'
import data from '../lib/utils/universities.json'

const UniversityEmailEndings: UniversityEmailArray =
    data as UniversityEmailArray

const prisma = new PrismaClient()

const firstNames = [
    'Olivia',
    'Amelia',
    'Isla',
    'Ava',
    'Emily',
    'Toby',
    'Oliver',
    'Harry',
    'Jack',
    'Charlie',
]

const lastNames = [
    'Smith',
    'Jones',
    'Williams',
    'Taylor',
    'Brown',
    'Davies',
    'Evans',
    'Wilson',
    'Thomas',
    'Roberts',
]

const universityCourses = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Business',
    'Psychology',
    'Law',
    'Medicine',
]

// creates fake data in the database in order for testing purposes
async function main(): Promise<void> {
    for (let i = 0; i < 100; i++) {
        const firstName = firstNames[Math.floor(Math.random() * 10)]
        const lastName = lastNames[Math.floor(Math.random() * 10)]
        const email = `${firstName}${Math.floor(Math.random() * 100)}${
            UniversityEmailEndings[Math.floor(Math.random() * 132)].email
        }`
        const university = getUniversity(email) as string

        // eslint-disable-next-line no-await-in-loop
        await prisma.users.create({
            data: {
                firstName,
                lastName,
                email,
                university,
                course: universityCourses[Math.floor(Math.random() * 10)],
                bio: `${firstName} ${lastName} is a student at ${university}`,
                username: `${firstName}${lastName}${Math.floor(
                    Math.random() * 100
                )}`,
                birthday: `${new Date(
                    new Date('2000-01-01').getTime() +
                        Math.random() *
                            (new Date('2005-01-28').getTime() -
                                new Date('2000-01-01').getTime())
                ).toISOString()}`,
                settings: {
                    create: {
                        universityPreference: 'ALL',
                    },
                },
            },
        })
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
