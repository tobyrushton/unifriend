import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { UserObject } from '../types'
import { useCreateUser, useSignUp } from '../hooks'

const Home: React.FC = () => {
    // const createUserInformation: UserObject = useMemo(
    //     () => ({
    //         firstName: 'Olivia',
    //         lastName: 'Rushton',
    //         university: 'Sheffield University',
    //         course: 'Financial Mathematics',
    //         birthday: '27102002',
    //         username: 'oliviarushton4',
    //         bio: '',
    //     }),
    //     []
    // )

    // const { loading, error, success } = useCreateUser(createUserInformation)

    const { data, error, loading } = useSignUp('113256', 'txbyplayz@gmail.com')
    useEffect(() => {
        console.log('loading: ', loading)
    }, [loading])
    useEffect(() => {
        console.log('error: ', error)
    }, [error])
    useEffect(() => {
        console.log('data: ', data)
    }, [data])

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
