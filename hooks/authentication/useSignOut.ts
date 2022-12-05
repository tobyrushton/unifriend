import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHook, AuthenticationFunction } from '../../types'

export const useSignOut = (): AuthenticationHook => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(false)

    const response: AuthenticationFunction = async () => {
        setLoading(true)
        // uses sign out method
        const { error } = await supabase.auth.signOut()
        // updates state upon completion
        setLoading(false)

        return {
            error,
            success: !!error,
        }
    }

    return {
        loading,
        response,
    }
}
