'use client'

import { FC, useState, useEffect } from 'react'
import {
    useNotifications,
    useMutation,
    useLoadingScreen,
    useUser,
} from '../../../hooks'
import {
    UserFromFriend,
    IDArguement,
    FriendRequestParams,
} from '../../../types'
import { DELETE_FRIEND_REQUEST, CREATE_FRIEND } from '../../../graphql/queries'
import { Text, ProfilePicture } from '../../../components'
import styles from '../../../styles/modules/Requests.module.scss'

export const DisplayRequests: FC<{ fetchedRequests?: UserFromFriend[] }> = ({
    fetchedRequests,
}) => {
    const [requests, setRequests] = useState<UserFromFriend[] | undefined>(
        fetchedRequests
    )

    // hooks
    const { createNotification } = useNotifications()
    const { loading, mutation } = useMutation()
    const { setLoading } = useLoadingScreen()
    const { user } = useUser()

    // synchornises the loading state with the loading state of the query hook
    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

    // deletes a friend request
    const handleDeleteRequest = async ({
        id,
    }: {
        id: string
    }): Promise<{ success: boolean }> => {
        // mutation to delete the friend request
        const { error, success } = await mutation<IDArguement, IDArguement>({
            mutation: DELETE_FRIEND_REQUEST,
            id,
        })
        if (error)
            error.forEach(e => {
                createNotification({
                    type: 'error',
                    content: e.message,
                })
            })

        if (success)
            // removes the request from the state
            setRequests(
                [...(requests as UserFromFriend[])]?.filter(
                    request => request.rowId !== id
                )
            )

        return { success }
    }

    // creates a friendship
    const handleCreateFriend = async ({
        id,
        friendId,
    }: {
        id: string
        friendId: string
    }): Promise<void> => {
        const { success: deleteSuccess } = await handleDeleteRequest({
            id,
        }) // deletes the friend request first
        // if the request was not deleted successfully, return
        if (!deleteSuccess) return
        // mutation to create a friendship
        const { error, success } = await mutation<
            IDArguement,
            FriendRequestParams
        >({ mutation: CREATE_FRIEND, usersId: user.id, friendId })
        if (error)
            error.forEach(e => {
                createNotification({
                    type: 'error',
                    content: e.message,
                })
            })
        else if (success)
            createNotification({
                type: 'success',
                content: 'Friend request accepted successfully',
            })
    }

    return (
        <div className={styles.screen}>
            <div className={styles.requestContainer}>
                {requests?.map((request, idx) => (
                    <div
                        className={styles.request}
                        key={'request'.concat(idx.toString())}
                    >
                        <ProfilePicture
                            image={request.id}
                            width={75}
                            height={75}
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            <Text>{request.fullName}</Text>
                            <Text small>@{request.username}</Text>
                        </div>
                        <div className={styles.buttons}>
                            <Text
                                clickable
                                small
                                color="success"
                                onClick={() =>
                                    handleCreateFriend({
                                        id: request.rowId,
                                        friendId: request.id,
                                    })
                                }
                            >
                                Accept
                            </Text>
                            <Text
                                clickable
                                small
                                color="error"
                                onClick={() =>
                                    handleDeleteRequest({ id: request.rowId })
                                }
                            >
                                Deny
                            </Text>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
