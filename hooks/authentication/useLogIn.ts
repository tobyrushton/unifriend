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

    // useEffect hook used in order to run once
    useEffect(() => {
        const response = async () => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            }) // signs in with email and password

            // updates state on completion
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
