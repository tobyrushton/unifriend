// /lib/prisma.ts
import { PrismaClient, Prisma } from '@prisma/client'

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
