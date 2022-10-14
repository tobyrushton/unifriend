interface configInterface {
    DATABASE_URL: string
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
}

const DATABASE_URL = process.env.DATABASE_URL as string
const SUPABASE_URL = process.env.SUPABASE_URL as string
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string

if (
    DATABASE_URL === undefined ||
    SUPABASE_URL === undefined ||
    SUPABASE_ANON_KEY === undefined
)
    throw new Error('Missing environment variables')

export const config: configInterface = {
    DATABASE_URL,
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
}
