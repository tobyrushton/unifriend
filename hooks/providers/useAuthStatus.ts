import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'
import { authStatusReturnType } from '../../types'

export const useAuthStatus = (): authStatusReturnType => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        // despite the default value of loading being true, loading is set to true as this function may run again.
        setLoading(true)

        // Check active sessions and sets the user
        const getSession = async () => {
            const session = await supabase.auth.getSession()
            setSession(session?.data.session ?? null)
            setLoading(false)
        }
        getSession()

        // Listen for changes on auth state (logged in, signed out, etc.)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session ?? null)
            setLoading(false)
        })

        // unsubscribes when the prorgam derenders
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return {
        session,
        loading,
    }
}
