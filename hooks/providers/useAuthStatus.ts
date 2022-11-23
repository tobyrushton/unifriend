import { useEffect, useState, useMemo } from 'react'
import { Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'
import { authStatusReturnType } from '../../types'
import { useNotifications } from './useNotifications'

export const useAuthStatus = (): authStatusReturnType => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [passwordResetRequest, setPasswordResetRequest] =
        useState<boolean>(false)
    const { createNotification } = useNotifications()

    const resetPassword = useMemo(
        () =>
            async (password: string): Promise<void> => {
                setLoading(true)
                await supabase.auth
                    .updateUser({
                        password,
                    })
                    .catch((e: AuthError) =>
                        createNotification({
                            type: 'error',
                            content: e.message,
                        })
                    )
                    .then(data => {
                        setLoading(false)
                        if (data) {
                            createNotification({
                                type: 'success',
                                content: 'Password changed successfully.',
                            })
                            setPasswordResetRequest(() => false)
                        }
                    })
            },
        []
    )

    useEffect(() => {
        // despite the default value of loading being true
        // loading is set to true as this function may run again.
        setLoading(true)

        // Check active sessions and sets the user
        const getSession = async (): Promise<void> => {
            const authSession = await supabase.auth.getSession()
            setSession(authSession?.data.session ?? null)
            setLoading(false)
        }
        getSession()

        // Listen for changes on auth state (logged in, signed out, etc.)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, authSession) => {
            setSession(authSession ?? null)
            setLoading(false)
            if (event === 'PASSWORD_RECOVERY') setPasswordResetRequest(true)
        })

        // unsubscribes when the prorgam derenders
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return {
        session,
        loading,
        passwordResetRequest,
        resetPassword,
    }
}
