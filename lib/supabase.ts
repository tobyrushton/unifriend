import { config } from '../config'
import { createClient } from '@supabase/supabase-js'

//creates an instance of supabase that will be used to handle authentication.
export const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY)