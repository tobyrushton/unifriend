import { FC, useEffect, useState } from 'react'
import { AuthError } from '@supabase/supabase-js'
import { Text, Button, Input } from '../ui'
import { supabase } from '../../lib/supabase'
import { isValidEmail } from '../../lib/utils'
import { useLoadingScreen, useNotifications } from '../../hooks'

export const ForgottenPasswordScreen: FC = () => {
    const [accountEmail, setAccountEmail] = useState<string>('')
    const [buttonActive, setButtonActive] = useState<boolean>(false)
    const [emailSent, setEmailSent] = useState<boolean>(false)
    const [error, setError] = useState<AuthError>()

    const { createNotification } = useNotifications()
    const { setLoading } = useLoadingScreen()

    // function to send a reset email
    const sendEmail = async (): Promise<void> => {
        setLoading(true)
        await supabase.auth
            .resetPasswordForEmail(accountEmail) // sends to the email inputted by the user
            .catch(e => setError(e)) // sets state on error
            .then(data => {
                if (data) {
                    // if successful creates a success notificiation
                    createNotification({
                        type: 'success',
                        content: 'Reset Email sent successfully',
                    })
                    // update state on completion
                    setEmailSent(true)
                    setLoading(false)
                }
            })
    }

    useEffect(() => {
        // when there is an error, creates notification
        if (error)
            createNotification({
                type: 'error',
                content: error.message,
            })
    }, [error, createNotification])

    // sets the button to be active if the email is valid
    useEffect(() => {
        if (isValidEmail(accountEmail)) setButtonActive(true)
        else setButtonActive(false)
    }, [accountEmail, setButtonActive])

    return emailSent ? (
        <>
            <Text header textAlign="center">
                Please check your email to reset your password
            </Text>
            <Text textAlign="center" style={{ marginTop: '2%' }}>
                If the email doesn&apos;t show up, please check your junk email
                or retry
            </Text>
            <Button filled onClick={sendEmail} style={{ marginTop: '5%' }}>
                Retry
            </Button>
        </>
    ) : (
        <>
            <Text header>Enter account email</Text>
            <Input
                type="text"
                placeholder="Account Email"
                setValue={change => setAccountEmail(() => change)}
                maxLength={32}
                style={{
                    marginTop: '5%',
                }}
            />
            <Button
                inactive={!buttonActive}
                onClick={sendEmail}
                style={{ marginTop: '2.5%' }}
            >
                Send recovery email
            </Button>
        </>
    )
}
