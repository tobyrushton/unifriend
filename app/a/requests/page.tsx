import 'server-only'

import { ReactElement } from 'react'
import {
    UserFromFriend,
    QueryReturn,
    IDArguement,
    EmailQuery,
    Join,
    UserByEmailOptions,
    UserFromFriendQuery,
} from '../../../types'
import {
    GET_FRIEND_REQUESTS_BY_ID,
    GET_USER_BY_EMAIL_OPTIONAL,
} from '../../../graphql/queries'
import { isError } from '../../../lib/utils'
import { initiateApollo } from '../../../lib/apollo'
import { getServerSideSupabase } from '../../../lib/supabase'
import { DisplayRequests } from './DisplayRequests'

// fetches the users friend requests
const getData = async (): Promise<
    [IDArguement | Error, UserFromFriend[] | Error]
> => {
    const supabase = getServerSideSupabase()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session === null) return [new Error(), new Error()]

    const apollo = initiateApollo()

    // fetches the users id
    const {
        data: {
            UserQueryByEmail: { id },
        },
        error: userError,
    } = await apollo.query<
        QueryReturn<IDArguement, 'User', 'UserQueryByEmail'>,
        Join<EmailQuery, UserByEmailOptions>
    >({
        query: GET_USER_BY_EMAIL_OPTIONAL,
        variables: { email: session.user.email as string, id: true },
    })
    if (userError) return [userError, new Error()]

    // fetches the users friend requests
    const {
        error,
        data: { getFriendRequests: friends },
    } = await apollo.query<
        QueryReturn<UserFromFriendQuery[], 'User', 'getFriendRequests'>,
        IDArguement
    >({
        query: GET_FRIEND_REQUESTS_BY_ID,
        variables: { id },
    })

    if (error) return [{ id }, error]
    /* eslint-disable-next-line */
    return [{ id }, friends.map(({ __typename, ...friend }) => friend)]
}

const Requests = async (): Promise<ReactElement> => {
    const [user, requests] = await getData()

    // error logic here
    if (isError(user)) return <div />
    if (isError(requests)) return <div />

    return <DisplayRequests fetchedRequests={requests} />
}

export default Requests
