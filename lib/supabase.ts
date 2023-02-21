import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

// creates an instance of supabase that will be used to handle authentication.
export const supabase = createBrowserSupabaseClient()
