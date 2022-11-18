import { AuthError } from '@supabase/supabase-js'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturnWithData, authDataType } from '../../types'

export const useSignUp = (): AuthenticationHookReturnWithData<string> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<authDataType>({
        user: null,
        session: null,
    })
    const [error, setError] = useState<AuthError | null>(null)

    const response = async (email: string, password: string): Promise<void> => {
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

    return {
        loading,
        data,
        error,
        response,
    }
}
