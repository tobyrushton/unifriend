import { AuthError } from '@supabase/supabase-js'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturn } from '../../types'

export const useSignOut = (): AuthenticationHookReturn<undefined> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<AuthError | null>(null)

    const response = async (): Promise<void> => {
        // uses sign out method
        const { error: errorFromAuth } = await supabase.auth.signOut()
        // updates state upon completion
        setError(errorFromAuth)
        setLoading(false)
    }

    return {
        loading,
        error,
        response,
    }
}
