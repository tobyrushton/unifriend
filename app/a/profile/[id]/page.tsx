'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import {
    useQuery,
    useLoadingScreen,
    useNotifications,
    useMutation,
    useUser,
} from '../../../../hooks'
import {
    SelectUserByIDParameters,
    UserObject,
    GetUserByIDQuery,
    QueryReturn,
    IDArguement,
    UserFromFriend,
    Friends,
    FriendRequestParams,
} from '../../../../types'
import { Text, ProfilePicture, Button } from '../../../../components'
import {
    UserByIDQuery,
    GET_FRIENDS_BY_ID,
    CREATE_FRIEND_REQUEST,
} from '../../../../graphql/queries'
import styles from '../../../../styles/modules/Profile.module.scss'

const Profile: FC<{ params: { id: string } }> = ({ params }) => {
    const [profile, setProfile] = useState<UserObject>()
    const [friends, setFriends] = useState<UserFromFriend[]>()

    const { loading: queryLoading, query } = useQuery()
    const { loading: mutationLoading, mutation } = useMutation()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()
    const { user } = useUser()

    useEffect(() => {
        /* eslint-disable-next-line */
        (async (): Promise<void> => {
            const { data, error } = await query<
                GetUserByIDQuery<UserObject, 'users'>,
                SelectUserByIDParameters
            >({
                query: UserByIDQuery,
                id: params.id,
                all: true,
            })

            if (data) {
                const { __typename, ...userDetails } = data.users
                setProfile(userDetails)
            } else if (error) {
                createNotification({
                    type: 'error',
                    content: error.message,
                })
            }
        })()
        ;(async (): Promise<void> => {
            const { data, error } = await query<
                QueryReturn<UserFromFriend[], 'Friends', 'getFriends'>,
                IDArguement
            >({ query: GET_FRIENDS_BY_ID, id: params.id })
            if (data) {
                setFriends(data.getFriends)
            } else if (error)
                createNotification({
                    type: 'error',
                    content: error.message,
                })
        })()
    }, [params.id, createNotification, query])

    useEffect(() => {
        setLoading(queryLoading || mutationLoading)
    }, [mutationLoading, queryLoading, setLoading])

    const handleFriendRequest = async (): Promise<void> => {
        const { success, error } = await mutation<Friends, FriendRequestParams>(
            {
                mutation: CREATE_FRIEND_REQUEST,
                usersId: user.id,
                friendId: params.id,
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

    return (
        <div className={styles.container}>
            <div className={styles.profileContainer}>
                <ProfilePicture image={params.id} />
                <div className={styles.detailsContainer}>
                    <Text bold>@{profile?.username}</Text>
                    <Text>
                        {profile?.firstName} {profile?.lastName}
                    </Text>
                    <Text>{profile?.university}</Text>
                    <Text>{profile?.course}</Text>
                </div>
                <div className={styles.buttonContainer}>
                    {params.id !== user.id ? (
                        friends?.some(
                            friend =>
                                friend.id === user.id &&
                                friend.username === user.username
                        ) ? (
                            <Link
                                href={`/a/messages/${params.id}`}
                                className={styles.link}
                            >
                                Send message
                            </Link>
                        ) : (
                            <Button
                                filled
                                onClick={handleFriendRequest}
                                inactive={queryLoading}
                            >
                                Send Friend Request
                            </Button>
                        )
                    ) : null}
                </div>
            </div>
            <div className={styles.item}>
                <Text>{profile?.bio}</Text>
            </div>
            <div className={styles.item}>
                <Text bold>Friends</Text>
            </div>
            <div className={styles.friendsContainer}>
                {friends?.map((friend, idx) => (
                    <div
                        className={styles.friend}
                        key={'friend'.concat(idx.toString())}
                    >
                        <ProfilePicture
                            image={friend.id}
                            width={50}
                            height={50}
                        />
                        <Link
                            href={`/a/profile/${friend.id}`}
                            legacyBehavior
                            passHref
                        >
                            {/* eslint-disable-next-line */}
                            <a>
                                <Text bold>{friend.username}</Text>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile
