import { AuthError } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturn } from '../../types'

export const useSignOut = (): AuthenticationHookReturn => {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<AuthError | null>(null)

    useEffect(() => {
        const response = async () => {
            const { error } = await supabase.auth.signOut()
            setError(error)
            setLoading(false)
        }

        response()
    }, [])

    return {
        loading,
        error,
    }
}
