import { useEffect, useState, useMemo } from 'react'
import { Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'
import { AuthStatusReturnType } from '../../types'
import { useNotifications } from './useNotifications'

export const useAuthStatus = (): AuthStatusReturnType => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [passwordResetRequest, setPasswordResetRequest] =
        useState<boolean>(false)
    const { createNotification } = useNotifications()

    // function to handle reset password
    const resetPassword = useMemo(
        // memoised
        () =>
            async (password: string): Promise<void> => {
                setLoading(true)
                await supabase.auth
                    .updateUser({
                        password,
                    }) // updates user details with the new password
                    .catch(
                        (e: AuthError) =>
                            createNotification({
                                type: 'error',
                                content: e.message,
                            }) // on error creates a notification
                    )
                    .then(data => {
                        setLoading(false) // sets loading to false on completion
                        if (data) {
                            createNotification({
                                // on success creates notification
                                type: 'success',
                                content: 'Password changed successfully.',
                            })
                            // sets the need for passwordRequest to false
                            setPasswordResetRequest(() => false)
                        }
                    })
            },
        [createNotification]
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
