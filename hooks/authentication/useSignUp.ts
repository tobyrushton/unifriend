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

    // useEffect hook used to ensure that it runs once
    useEffect(() => {
        const response = async () => {
            // signUp method used to create new account
            const { data, error } = await supabase.auth.signUp({
                password,
                email,
            })
            // state changed upon completion
            setError(error)
            setData(data)
            setLoading(false)
        }

        response()
    }, [])

    return {
        loading,
        data,
        error,
    }
}
