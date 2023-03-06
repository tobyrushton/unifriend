'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { User, Text } from '../../components'
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

    // hooks
    const { user, settings } = useUser()
    const { createNotification } = useNotifications()
    const { setLoading } = useLoadingScreen()
    const { loading, query } = useQuery()

    // synchornises the loading state with the loading state of the query hook
    useEffect(() => setLoading(loading), [loading, setLoading])

    // fetches a new user when list is refreshed
    const getNewUsers = async (): Promise<void> => {
        // fetches new user based on users settings
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
            fetchPolicy: 'no-cache', // no cache in order to ensure different return every time.
        })
        if (error)
            createNotification({
                type: 'error',
                content: 'Error fetching users',
            })
        if (data) setUsers(data.user)
    }

    // fetches a new user when a user is removed
    const getNewUser = async (id: string): Promise<void> => {
        // fetches a new user based on users settings
        const { data, error } = await query<
            QueryReturn<UserObjectWithID, 'User', 'user'>,
            Join<
                IDArguement,
                {
                    universityPreference: string
                    university: string
                    take: number
                }
            >
        >({
            query: GET_USER,
            id: user.id,
            universityPreference: settings.universityPreference,
            university: user.university,
            take: 1,
            fetchPolicy: 'no-cache', // no cache in order to ensure different return every time.
        })
        if (error)
            createNotification({
                type: 'error',
                content: 'Error fetching users',
            })
        if (data)
            // replaces the user that was removed with the new user
            setUsers(prev =>
                structuredClone(prev)
                    .filter(u => u.id !== id)
                    .concat(data.user)
            )
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
                style={{
                    filter: settings.darkMode ? 'invert(1)' : 'invert(0)',
                }}
            />
            <div className={styles.usersContainer}>
                {users.length > 0 ? (
                    users.map((userCard, idx) => (
                        <User
                            key={'user'.concat(idx.toString())}
                            user={userCard}
                            getNewUser={getNewUser}
                        />
                    ))
                ) : (
                    <Text header>No users found</Text>
                )}
            </div>
        </>
    )
}
