import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { UserObject } from '../types'
import { useCreateUser } from '../hooks/index'

const Home: React.FC = () => {
    const createUserInformation: UserObject = {
        firstName: 'Olivia',
        lastName: 'Rushton',
        university: 'Sheffield University',
        course: 'Financial Mathematics',
        birthday: '27102002',
        username: 'oliviarushton'
    }
    
    
    // const { loading, error, success } = useCreateUser(createUserInformation)
    
    return(
    <div className={styles.container}>
        <Head>
            <title>UniFriend</title>
            <meta name="description" content="Meet other students" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
            {/* <pre>
                status: {loading}
                success: {success}
                error: {error?.message}
            </pre> */}
        </div>
    </div>
)}

export default Home
