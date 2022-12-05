import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import {
    AuthenticationHook,
    AuthenticationParams,
    AuthenticationFunction,
} from '../../types'

export const useSignUp = (): AuthenticationHook<AuthenticationParams> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(false)

    const response: AuthenticationFunction<AuthenticationParams> = async ({
        email,
        password,
    }) => {
        setLoading(true)
        // signUp method used to create new account
        const { data, error } = await supabase.auth.signUp({
            password,
            email,
        })
        // state changed upon completion
        setLoading(false)

        return {
            error,
            success: !!data,
        }
    }

    return {
        loading,
        response,
    }
}
