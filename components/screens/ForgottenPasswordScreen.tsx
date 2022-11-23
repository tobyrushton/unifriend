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

    const sendEmail = async (): Promise<void> => {
        setLoading(true)
        await supabase.auth
            .resetPasswordForEmail(accountEmail)
            .catch(e => setError(e))
            .then(data => {
                if (data) {
                    createNotification({
                        type: 'success',
                        content: 'Reset Email sent successfully',
                    })
                    setEmailSent(true)
                    setLoading(false)
                }
            })
    }

    useEffect(() => {
        if (error)
            createNotification({
                type: 'error',
                content: error.message,
            })
    }, [error, createNotification])

    useEffect(() => {
        if (isValidEmail(accountEmail)) setButtonActive(true)
        else setButtonActive(false)
    }, [accountEmail, setButtonActive])

    return emailSent ? (
        <>
            <Text header>Please check your email to reset your password</Text>
            <Text>
                If the email doesn&apos;t show up, please chekc your junk email
                or retry
            </Text>
            <Button filled onClick={sendEmail}>
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
