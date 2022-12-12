'use client'

import { FC, useState, useEffect } from 'react'
import {
    useNotifications,
    useQuery,
    useMutation,
    useLoadingScreen,
    useUser,
} from '../../../hooks'
import {
    UserFromFriend,
    QueryReturn,
    IDArguement,
    FriendRequestParams,
} from '../../../types'
import {
    GET_FRIEND_REQUESTS_BY_ID,
    DELETE_FRIEND_REQUEST,
    CREATE_FRIEND,
} from '../../../graphql/queries'
import { Text, ProfilePicture } from '../../../components'
import styles from '../../../styles/modules/Requests.module.scss'

const Requests: FC = () => {
    const [requests, setRequests] = useState<UserFromFriend[]>()

    const { user } = useUser()
    const { loading: queryLoading, query } = useQuery()
    const { loading: mutationLoading, mutation } = useMutation()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()

    useEffect(() => {
        setLoading(queryLoading || mutationLoading)
    }, [queryLoading, mutationLoading, setLoading])

    useEffect(() => {
        /* eslint-disable-next-line */
        (async (): Promise<void> => {
            const { error, data } = await query<
                QueryReturn<UserFromFriend[], 'User', 'getFriendRequests'>,
                IDArguement
            >({
                query: GET_FRIEND_REQUESTS_BY_ID,
                id: user.id,
            })
            if (error)
                createNotification({
                    type: 'error',
                    content: error.message,
                })
            else if (data) setRequests(data.getFriendRequests)
        })()
    }, [query, user, createNotification, setRequests])

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

export default Requests
