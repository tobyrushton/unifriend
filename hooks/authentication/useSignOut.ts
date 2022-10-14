import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturn } from '../../types'

export const useSignOut = async (): Promise<AuthenticationHookReturn> => {
    const [loading, setLoading] = useState<boolean>(true)
    const { error } = await supabase.auth.signOut()
    setLoading(false)

    return {
        loading,
        error,
    }
}
