import { FC, useEffect, useState } from 'react'
import { AuthError } from '@supabase/supabase-js'
import { Text, Button, Input } from '../ui'
import { supabase } from '../../lib/supabase'
import { isValidEmail, isValidPassword } from '../../lib/utils'
import { ResetPasswordProps } from '../../types'
import { useNotifications } from '../../hooks'

const PasswordScreen: FC = () => {
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [buttonActive, setButtonActive] = useState<boolean>(false)
    const [error, setError] = useState<AuthError>()

    const { createNotification } = useNotifications()

    const resetPassword = async (): Promise<void> => {
        await supabase.auth
            .updateUser({
                password,
            })
            .catch(e => setError(e))
    }

    useEffect(() => {
        if (error)
            createNotification({
                type: 'error',
                content: error.message,
            })
    }, [error, createNotification])

    useEffect(() => {
        if (isValidPassword(password) && isValidPassword(confirmPassword))
            if (password === confirmPassword) setButtonActive(true)
            else setButtonActive(false)
        else setButtonActive(false)
    }, [password, confirmPassword, setButtonActive])

    return (
        <>
            <Text>Enter new password</Text>
            <Input
                type="password"
                placeholder="New Password"
                setValue={change => setPassword(() => change)}
            />
            <Input
                type="password"
                placeholder="Confirm Password"
                setValue={change => setConfirmPassword(() => change)}
            />
            <Button onClick={resetPassword} inactive={!buttonActive}>
                Reset
            </Button>
        </>
    )
}

export const EmailScreen: FC = () => {
    const [accountEmail, setAccountEmail] = useState<string>('')
    const [buttonActive, setButtonActive] = useState<boolean>(false)
    const [error, setError] = useState<AuthError>()

    const { createNotification } = useNotifications()

    const sendEmail = async (): Promise<void> => {
        await supabase.auth
            .resetPasswordForEmail(accountEmail)
            .catch(e => setError(e))
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

    return (
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

export const ForgottenPasswordScreen: FC<ResetPasswordProps> = ({ email }) => {
    if (email) return <EmailScreen />
    return <PasswordScreen />
}
