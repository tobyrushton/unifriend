import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturnWithData } from '../../types'

export const useSignUp = async (
    password: string,
    email: string
): Promise<AuthenticationHookReturnWithData> => {
    const [loading, setLoading] = useState<boolean>(true)
    const { data, error } = await supabase.auth.signUp({ password, email })
    setLoading(false)

    return {
        loading,
        data,
        error,
    }
}
