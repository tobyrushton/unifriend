import { AuthError } from '@supabase/supabase-js'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturnWithData, authDataType } from '../../types'

export const useLogIn = (): AuthenticationHookReturnWithData<string> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<authDataType>({
        user: null,
        session: null,
    })
    const [error, setError] = useState<AuthError | null>(null)

    const response = async (email: string, password: string): Promise<void> => {
        setLoading(true)
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

    return {
        data,
        error,
        loading,
        response,
    }
}
