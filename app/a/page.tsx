import 'server-only'

import { ReactElement } from 'react'
import Image from 'next/image'
import { User } from '../../components/ui/User'
import styles from '../../styles/modules/Home.module.scss'
import { UserObjectWithID, QueryReturn } from '../../types'
import { GET_USER } from '../../graphql/queries'
import { initiateApollo } from '../../lib/apollo'

const getData = async (): Promise<UserObjectWithID[]> => {
    const apollo = initiateApollo()
    const { data, error } = await apollo.query<
        QueryReturn<UserObjectWithID[], 'User', 'user'>
    >({
        query: GET_USER,
    })
    if (error) throw error
    return data.user
}

const A = async (): Promise<ReactElement> => {
    const users = await getData()
    return (
        <div className={styles.wrapper}>
            <Image
                className={styles.retryImage}
                src="/retry.svg"
                width={50}
                height={50}
                alt="retry icon"
            />
            <div className={styles.usersContainer}>
                {users.map((user, idx) => (
                    <User key={'user'.concat(idx)} user={user} />
                ))}
            </div>
        </div>
    )
}

export default A
