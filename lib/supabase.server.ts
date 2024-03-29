import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient'
import { headers, cookies } from 'next/headers'

// creates an instance of supabase that will be used to handle authentication on the server side.
export const getServerSideSupabase = (): SupabaseClient =>
    createServerComponentSupabaseClient({
        headers,
        cookies,
    })
