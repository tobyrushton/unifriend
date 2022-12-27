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

    const { createNotification } = useNotifications()
    const { loading, mutation } = useMutation()
    const { setLoading } = useLoadingScreen()
    const { user } = useUser()

    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

    const handleDeleteRequest = async ({
        id,
    }: {
        id: string
    }): Promise<{ success: boolean }> => {
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
            setRequests(
                [...(requests as UserFromFriend[])]?.filter(
                    request => request.rowId !== id
                )
            )

        return { success }
    }

    const handleCreateFriend = async ({
        id,
        friendId,
    }: {
        id: string
        friendId: string
    }): Promise<void> => {
        const { success: deleteSuccess } = await handleDeleteRequest({
            id,
        })
        if (!deleteSuccess) return
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
        <div className={styles.requestContainer}>
            {requests?.map((request, idx) => (
                <div
                    className={styles.request}
                    key={'request'.concat(idx.toString())}
                >
                    <ProfilePicture image={request.id} width={75} height={75} />
                    <Text>{request.username}</Text>
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
    )
}
