interface configInterface {
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

if (SUPABASE_URL === undefined || SUPABASE_ANON_KEY === undefined)
    throw new Error('Missing environment variables')

export const config: configInterface = {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
}
