import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient
    namespace NodeJS {
        interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        DATABASE_URL: string;
        }
    }
}