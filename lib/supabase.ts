import { createClient } from '@supabase/supabase-js'
import { config } from '../config'

// creates an instance of supabase that will be used to handle authentication.
export const supabase = createClient(
    config.SUPABASE_URL,
    config.SUPABASE_ANON_KEY
)
