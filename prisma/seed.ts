//not used during build time.

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//creates fake data in the database in order for testing purposes
async function main() {
  await prisma.users.create({
    data: {
        firstName:'Toby',
        lastName:'Rushton',
        university:'Oxford University',
        course: 'Computer Science',
        username: 'tobyrushton',
        birthday: '12062005',
        bio:''
    },
  })
  await prisma.users.create({
    data: {
        firstName:'Olivia',
        lastName:'Rushton',
        university:'Sheffield University',
        course: 'Financial Mathematics',
        username: 'oliviarushton',
        birthday: '27072002',
        bio:''
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