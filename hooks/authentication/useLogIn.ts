import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthenticationHookReturnWithData } from '../../types'

export const useLogIn = async(email:string,password:string):Promise<AuthenticationHookReturnWithData> => {
    const [ loading, setLoading ] = useState<boolean>(true)
    const { data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })
    setLoading(false)

    return {
        data,
        error,
        loading
    }
}