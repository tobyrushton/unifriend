import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient
    namespace NodeJS {
        interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        DATABASE_URL: string;
        SUPABASE_URL: string;
        SUPABASE_ANON_KEY: string;
        }
    }
    declare module '*.module.css' {
        const value: Record<string, string>;
        export default value;
    }
}
