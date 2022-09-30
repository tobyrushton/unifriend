// /lib/prisma.ts
import { PrismaClient, Prisma } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

// let prisma: PrismaClient
//
// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient();
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
// }
// export default prisma;

const getPrisma = (): PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
> => {
    if (process.env.NODE_ENV === 'production') {
        const prisma = new PrismaClient()
        return prisma
    }

    if (!global.prisma) global.prisma = new PrismaClient()
    const { prisma } = global
    return prisma
}

export default getPrisma()
