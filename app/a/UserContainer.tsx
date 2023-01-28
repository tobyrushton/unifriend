'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { User } from '../../components'
import { UserObjectWithID, QueryReturn, Join, IDArguement } from '../../types'
import {
    useQuery,
    useNotifications,
    useLoadingScreen,
    useUser,
} from '../../hooks'
import { GET_USER } from '../../graphql/queries'
import styles from '../../styles/modules/Home.module.scss'

export const UserContainer: FC<{ fetchedUsers: UserObjectWithID[] }> = ({
    fetchedUsers,
}) => {
    const [users, setUsers] = useState<UserObjectWithID[]>(fetchedUsers)

    const { user, settings } = useUser()
    const { createNotification } = useNotifications()
    const { setLoading } = useLoadingScreen()
    const { loading, query } = useQuery()

    useEffect(() => setLoading(loading), [loading])

    const getNewUsers = async (): Promise<void> => {
        console.log('t')
        const { data, error } = await query<
            QueryReturn<UserObjectWithID[], 'User', 'user'>,
            Join<
                IDArguement,
                { universityPreference: string; university: string }
            >
        >({
            query: GET_USER,
            id: user.id,
            universityPreference: settings.universityPreference,
            university: user.university,
            fetchPolicy: 'no-cache'
        })
        console.log(data)
        if (error)
            createNotification({
                type: 'error',
                content: 'Error fetching users',
            })
        if (data) setUsers(data.user)
    }

    return (
        <>
            <Image
                className={styles.retryImage}
                src="/retry.svg"
                width={50}
                height={50}
                alt="retry icon"
                onClick={getNewUsers}
            />
            <div className={styles.usersContainer}>
                {users.map((user, idx) => (
                    <User key={'user'.concat(idx.toString())} user={user} />
                ))}
            </div>
        </>
    )
}
