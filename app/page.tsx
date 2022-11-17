'use client'

import { FC, useState } from 'react'
import { Logo, Text, Button, AuthScreen } from '../components'
import styles from '../styles/modules/Home.module.scss'
import { authState } from '../types'

const Home: FC = () => {
    const [auth, setAuth] = useState<authState>({ active: false })

    return (
        <>
            <div className={styles.logoContainer}>
                <Logo color="primary" />
            </div>
            <div className={styles.line} />
            <div className={styles.accountContainer}>
                <Text header bold>
                    Join UniFriend today.
                </Text>
                <Button
                    onClick={() => {
                        setAuth({
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
                <Text bold style={{ marginTop: '15%' }}>
                    Already have an account?
                </Text>
                <Button
                    onClick={() => {
                        setAuth({
                            active: true,
                            type: 'log in',
                        })
                    }}
                    style={{ marginRight: 'auto', marginLeft: 'auto' }}
                >
                    Sign In
                </Button>
            </div>
            {auth.active ? (
                auth.type === 'log in' ? (
                    <AuthScreen logIn />
                ) : (
                    <AuthScreen signUp />
                )
            ) : null}
        </>
    )
}

export default Home
