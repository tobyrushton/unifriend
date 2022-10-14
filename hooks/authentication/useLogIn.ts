import { AuthError } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturnWithData, data } from '../../types'

export const useLogIn = (
    email: string,
    password: string
): AuthenticationHookReturnWithData => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<data>({ user: null, session: null })
    const [error, setError] = useState<AuthError | null>(null)

    useEffect(() => {
        const response = async () => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            setLoading(false)
            setError(error)
            setData(data)
        }

        response()
    }, [])

    return {
        data,
        error,
        loading,
    }
}
