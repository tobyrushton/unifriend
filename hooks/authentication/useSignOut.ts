import { AuthError } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturn } from '../../types'

export const useSignOut = (): AuthenticationHookReturn => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<AuthError | null>(null)

    const response = async (): Promise<void> => {
        // uses sign out method
        const { error: AuthError } = await supabase.auth.signOut()
        // updates state upon completion
        setError(AuthError)
        setLoading(false)
    }

    // useEffect hook used to ensure that it only runs once.
    useEffect(() => {
        response()
    }, [])

    return {
        loading,
        error,
    }
}
