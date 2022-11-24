'use client'

import { FC, useState } from 'react'
import { Logo, Text, Button, AuthScreen } from '../components'
import styles from '../styles/modules/Home.module.scss'
import { authState } from '../types'

const Home: FC = () => {
    const [auth, setAuth] = useState<authState>({ active: false })

    // refrencing this function instead of using the setter directly, forces a rerender.
    const changeAuth = (change: authState): void => {
        setAuth(change)
    }

    return (
        <>
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
        </>
    )
}

export default Home
