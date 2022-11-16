'use client'

import { FC } from 'react'
import { Logo, Text, Button } from '../components'
import styles from '../styles/modules/Home.module.scss'

const Home: FC = () => {
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
                        'link to sign up here'
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
                        'link to log in here'
                    }}
                    style={{ marginRight: 'auto', marginLeft: 'auto' }}
                >
                    Sign In
                </Button>
            </div>
        </>
    )
}

export default Home
