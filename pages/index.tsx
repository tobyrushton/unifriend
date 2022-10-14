import React, { useEffect, useMemo } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { UserObject } from '../types'
import { useCreateUser } from '../hooks/index'

const Home: React.FC = () => {
    const createUserInformation: UserObject = useMemo(
        () => ({
            firstName: 'Olivia',
            lastName: 'Rushton',
            university: 'Sheffield University',
            course: 'Financial Mathematics',
            birthday: '27102002',
            username: 'oliviarushton4',
            bio: '',
        }),
        []
    )

    const { loading, error, success } = useCreateUser(createUserInformation)

    useEffect(() => {
        console.log('loading: ', loading)
    }, [loading])
    useEffect(() => {
        console.log('error: ', error)
    }, [error])
    useEffect(() => {
        console.log('success: ', success)
    }, [success])

    return (
        <div className={styles.container}>
            <Head>
                <title>UniFriend</title>
                <meta name="description" content="Meet other students" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div />
        </div>
    )
}

export default Home
