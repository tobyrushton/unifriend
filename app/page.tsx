'use client'

import { FC, useState } from 'react'
import { Text, Button, AuthScreen } from '../components'
import { Logo } from '../components/ui/Logo'
import styles from '../styles/modules/Landing.module.scss'
import { AuthState } from '../types'

const Home: FC = () => {
    const [auth, setAuth] = useState<AuthState>({ active: false })

    // refrencing this function instead of using the setter directly, forces a rerender.
    const changeAuth = (change: AuthState): void => {
        setAuth(change)
    }

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Logo color="primary" />
            </div>
            <div className={styles.line} />
            <div className={styles.accountContainer}>
                <Text header bold textAlign="center">
                    Join UniFriend today.
                </Text>
                <Button
                    onClick={() => {
                        changeAuth({
                            active: true,
                            type: 'sign up',
                        })
                    }}
                    filled
                    style={{
                        marginTop: '5%',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                    }}
                >
                    Create an account
                </Button>
                <Text bold style={{ marginTop: '10%' }} textAlign="center">
                    Already have an account?
                </Text>
                <Button
                    onClick={() => {
                        changeAuth({
                            active: true,
                            type: 'log in',
                        })
                    }}
                    style={{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: '2%',
                    }}
                >
                    Sign In
                </Button>
            </div>
            {auth.active ? (
                auth.type === 'log in' ? (
                    <AuthScreen changeAuth={changeAuth} logIn />
                ) : (
                    <AuthScreen changeAuth={changeAuth} signUp />
                )
            ) : null}
        </div>
    )
}

export default Home
