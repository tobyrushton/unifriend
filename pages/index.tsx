import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: React.FC = () => (
    <div className={styles.container}>
        <Head>
            <title>UniFriend</title>
            <meta name="description" content="Meet other students" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    </div>
)

export default Home
