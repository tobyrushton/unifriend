import 'server-only'

import Link from 'next/link'
import { ReactElement } from 'react'
import {
    SelectUserByIDParameters,
    UserObject,
    QueryReturn,
    IDArguement,
    UserFromFriend,
} from '../../../../types'
import { Text, ProfilePicture } from '../../../../components'
import { GET_USER_BY_ID, GET_FRIENDS_BY_ID } from '../../../../graphql/queries'
import { initiateApollo } from '../../../../lib/apollo'
import { isError } from '../../../../lib/utils'
import { ButtonContainer } from './ButtonContainer'
import styles from '../../../../styles/modules/Profile.module.scss'

// fetches the users data and their friends
const getData = async (
    id: string
): Promise<[UserObject | Error, UserFromFriend[] | Error]> => {
    const apollo = initiateApollo()

    // fetches the users data and their friends using a Promise.all
    // Promise.all is used to execute the queries in parallel
    const res: [UserObject | Error, UserFromFriend[] | Error] =
        await Promise.all([
            (async (): Promise<UserObject | Error> => {
                // fetches the users data
                const { data, error } = await apollo.query<
                    QueryReturn<UserObject, 'users', 'users'>,
                    SelectUserByIDParameters
                >({
                    query: GET_USER_BY_ID,
                    variables: {
                        id,
                        all: true,
                    },
                })

                if (data) {
                    const { __typename, ...userDetails } = data.users
                    return userDetails
                }
                return error as Error
            })(),
            (async (): Promise<UserFromFriend[] | Error> => {
                // fetches the users friends
                const { data, error } = await apollo.query<
                    QueryReturn<UserFromFriend[], 'Friends', 'getFriends'>,
                    IDArguement
                >({ query: GET_FRIENDS_BY_ID, variables: { id } })
                if (data) {
                    return data.getFriends
                }
                return error as Error
            })(),
        ])

    return res
}

const Profile = async ({
    params,
}: {
    params: { id: string }
}): Promise<ReactElement> => {
    // fetches the data with the params of the pathname
    const [profile, friends] = await getData(params.id)

    // if error is present throws error to present the error screen
    if (isError(profile)) throw profile
    if (isError(friends)) throw friends

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
                    <ButtonContainer profileId={params.id} friends={friends} />
                </div>
            </div>
            <div className={styles.item} style={{ flexDirection: 'column' }}>
                <Text bold>Bio</Text>
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
