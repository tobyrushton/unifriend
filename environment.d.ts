import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient
    namespace NodeJS {
        interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        DATABASE_URL: string;
        NEXT_PUBLIC_SUPABASE_URL: string;
        NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
        }
    }
    declare module '*.module.css' {
        const value: Record<string, string>;
        export default value;
    }
}
