'use client'

import { FC, useEffect, useState } from 'react'
import { Text } from './Text'
import { ProfilePicture } from './ProfilePicture'
import {
    UserObjectWithID,
    FriendsWithID,
    QueryReturn,
    FriendRequestParams,
} from '../../types'
import {
    useMutation,
    useLoadingScreen,
    useNotifications,
    useUser,
} from '../../hooks'
import { getAge } from '../../lib/utils'
import { CREATE_FRIEND_REQUEST } from '../../graphql/queries'
import styles from '../../styles/modules/UI.module.scss'
import { Button } from './Button'

const FriendPopup: FC<{
    id: string
    exit: () => void
    getNewUser: (id: string) => Promise<void>
}> = ({ id, exit, getNewUser }) => {
    const { mutation, loading } = useMutation()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()
    const { user } = useUser()

    useEffect(() => setLoading(loading), [loading, setLoading])

    const createFriend = async (): Promise<void> => {
        const { success, error } = await mutation<
            QueryReturn<FriendsWithID, 'Friend', 'createFriend'>,
            FriendRequestParams
        >({
            mutation: CREATE_FRIEND_REQUEST,
            usersId: user.id,
            friendId: id,
        })
        if (error)
            createNotification({
                type: 'error',
                content: 'Error sending friend request',
            })

        if (success) {
            createNotification({
                type: 'success',
                content: 'Friend request sent',
            })
            setLoading(false)
            getNewUser(id)
            exit()
        }
    }

    return (
        <div className={styles.popupWrapper}>
            <div className={styles.popup}>
                <div className={styles.popupHeader}>
                    <Text header textAlign="center">
                        Send friend request?
                    </Text>
                </div>
                <div className={styles.popupButtons}>
                    <Button onClick={exit} style={{ color: 'red' }}>
                        Cancel
                    </Button>
                    <Button onClick={createFriend}>Send</Button>
                </div>
            </div>
        </div>
    )
}

export const User: FC<{
    user: UserObjectWithID
    getNewUser: (id: string) => Promise<void>
}> = ({ user, getNewUser }) => {
    const [displayPopup, setDisplayPopup] = useState(false)
    return (
        <>
            {displayPopup && (
                <FriendPopup
                    id={user.id}
                    exit={() => setDisplayPopup(false)}
                    getNewUser={getNewUser}
                />
            )}
            <div className={styles.user}>
                <div className={styles.userHeader}>
                    <ProfilePicture image={user.id} width={75} height={75} />
                    <div className={styles.userHeaderText}>
                        <Text
                            header
                            clickable
                            onClick={() => setDisplayPopup(true)}
                        >
                            {user.firstName} {user.lastName}
                        </Text>
                        <Text>📚 {user.course}</Text>
                        <Text>🎓 {user.university}</Text>
                        <Text>🎂 {getAge(user.birthday)} years old</Text>
                    </div>
                </div>
                <div className={styles.detailsContainer}>
                    <Text>{user.bio}</Text>
                </div>
            </div>
        </>
    )
}
