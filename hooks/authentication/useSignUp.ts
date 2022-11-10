import { AuthError } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturnWithData, data } from '../../types'

export const useSignUp = (
    password: string,
    email: string
): AuthenticationHookReturnWithData => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<data>({ user: null, session: null })
    const [error, setError] = useState<AuthError | null>(null)

    const response = async (): Promise<void> => {
        // signUp method used to create new account
        const { data: authData, error: authErorr } = await supabase.auth.signUp(
            {
                password,
                email,
            }
        )
        // state changed upon completion
        setError(authErorr)
        setData(authData)
        setLoading(false)
    }

    // useEffect hook used to ensure that it runs once
    useEffect(() => {
        response()
    }, [])

    return {
        loading,
        data,
        error,
    }
}
