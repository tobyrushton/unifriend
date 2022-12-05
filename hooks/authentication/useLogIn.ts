import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import {
    AuthenticationHook,
    AuthenticationParams,
    AuthenticationFunction,
} from '../../types'

export const useLogIn = (): AuthenticationHook<AuthenticationParams> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(false)

    const response: AuthenticationFunction<AuthenticationParams> = async ({
        email,
        password,
    }) => {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        }) // signs in with email and password

        // updates state on completion
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
