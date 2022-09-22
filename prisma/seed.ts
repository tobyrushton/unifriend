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
        age: 17
    },
  })
  await prisma.users.create({
    data: {
        firstName:'Olivia',
        lastName:'Rushton',
        university:'Sheffield University',
        course: 'Financial Mathematics',
        age: 19
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