'use client'

import { FC, useEffect } from 'react'
import Link from 'next/link'
import {
    useMutation,
    useUser,
    useNotifications,
    useLoadingScreen,
} from '../../../../hooks'
import {
    Friends,
    FriendRequestParams,
    IDArguement,
    UserFromFriend,
} from '../../../../types'
import {
    CREATE_FRIEND_REQUEST,
    DELETE_FRIEND,
} from '../../../../graphql/queries'
import { Button } from '../../../../components'
import styles from '../../../../styles/modules/Profile.module.scss'

type Props = {
    profileId: string
    friends: UserFromFriend[]
}

export const ButtonContainer: FC<Props> = ({ profileId, friends }) => {
    // hooks
    const { loading, mutation } = useMutation()
    const { user } = useUser()
    const { createNotification } = useNotifications()
    const { setLoading } = useLoadingScreen()

    // synchornises the loading state with the loading state of the query hook
    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

    // sends a friend request
    const handleFriendRequest = async (): Promise<void> => {
        // mutation to send a friend request
        const { success, error } = await mutation<Friends, FriendRequestParams>(
            {
                mutation: CREATE_FRIEND_REQUEST,
                usersId: user.id,
                friendId: profileId,
            }
        )
        if (success)
            createNotification({
                type: 'success',
                content: 'Friend request sent successfully',
            })
        else if (error)
            error.forEach(e =>
                createNotification({
                    type: 'error',
                    content: e.message,
                })
            )
    }

    // removes a friend
    const handleRemoveFriend = async (): Promise<void> => {
        if (!friends) return // ensures that the friends array is not empty

        // finds the id of the friend to be removed
        const id = friends.find(friend => friend.id === user.id)?.rowId

        if (!id) return

        // mutation to remove the friend
        const { success, error } = await mutation<IDArguement, IDArguement>({
            mutation: DELETE_FRIEND,
            id,
        })
        if (error)
            error.forEach(e =>
                createNotification({
                    type: 'error',
                    content: e.message,
                })
            )
        else if (success) {
            createNotification({
                type: 'success',
                content: 'Friend removed successfully',
            })
            // setFriends([...friends].filter(friend => friend.rowId !== id))
        }
    }

    return (
        <>
            {user.id === '' ? null : profileId !== user.id ? (
                friends?.some(
                    friend =>
                        friend.id === user.id &&
                        friend.username === user.username
                ) ? (
                    <>
                        <Link
                            href={`/a/messages/${profileId}`}
                            className={styles.link}
                        >
                            Send message
                        </Link>
                        <Button onClick={handleRemoveFriend} inactive={loading}>
                            Remove Friend
                        </Button>
                    </>
                ) : (
                    <Button filled onClick={handleFriendRequest}>
                        Send Friend Request
                    </Button>
                )
            ) : null}
        </>
    )
}
