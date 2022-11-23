'use client'

import { FC, useState, useEffect } from 'react'
import { useUser } from '../../hooks'
import { Button, Text, Input } from '../../components'
import { isValidPassword } from '../../lib/utils'
import styles from '../../styles/modules/ResetPassword.module.scss'

const ResetPassword: FC = () => {
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [buttonActive, setButtonActive] = useState<boolean>(false)

    const { resetPassword } = useUser()

    useEffect(() => {
        if (isValidPassword(password) && isValidPassword(confirmPassword))
            if (password === confirmPassword) setButtonActive(true)
            else setButtonActive(false)
        else setButtonActive(false)
    }, [password, confirmPassword, setButtonActive])

    return (
        <div className={styles.resetContainer}>
            <form>
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
                <Button
                    onClick={() => resetPassword(password)}
                    inactive={!buttonActive}
                >
                    Change Password
                </Button>
            </form>
        </div>
    )
}

export default ResetPassword
