import { AuthError } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturnWithData, data } from '../../types'

export const useLogIn = (
    email: string,
    password: string
): AuthenticationHookReturnWithData => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<data>({ user: null, session: null })
    const [error, setError] = useState<AuthError | null>(null)

    const response = async (): Promise<void> => {
        const { data: authData, error: authErorr } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            }) // signs in with email and password

        // updates state on completion
        setLoading(false)
        setError(authErorr)
        setData(authData)
    }

    // useEffect hook used in order to run once
    useEffect(() => {
        response()
    }, [])

    return {
        data,
        error,
        loading,
    }
}
