import 'server-only'

import { ReactElement } from 'react'
import { ProfilePicture, Text, MessagingProvider } from '../../../../components'
import {
    IDArguement,
    MessageWithId,
    QueryReturn,
    GetUserIdFromConversationArgs,
    GetUserFromConversationReturn,
} from '../../../../types'
import { initiateApollo } from '../../../../lib/apollo'
import {
    GET_MESSAGES,
    GET_USER_ID_FROM_CONVERSATION,
} from '../../../../graphql/queries'
import { isError } from '../../../../lib/utils'
import { MessageInput } from './input'
import { Messages } from './messages'
import { getServerSideSupabase } from '../../../../lib/supabase.server'
import styles from '../../../../styles/modules/Messages.module.scss'

// fetches all messages and the other users details
const getData = async (
    id: string
): Promise<
    [MessageWithId[] | Error, GetUserFromConversationReturn | Error]
> => {
    const apollo = initiateApollo()
    const supabase = getServerSideSupabase()

    const {
        data: { session },
    } = await supabase.auth.getSession()
    // if no session is found, throw an error
    if (session === null) throw new Error('No session found')

    // fetches all messages and the other users details
    // Promise.all is used to fetch both queries at the same time in parallel
    const val: [
        MessageWithId[] | Error,
        GetUserFromConversationReturn | Error
    ] = await Promise.all([
        (async (): Promise<MessageWithId[] | Error> => {
            // fetches all messages
            const { data, error } = await apollo.query<
                QueryReturn<MessageWithId[], 'Message', 'GetMessages'>,
                IDArguement
            >({ query: GET_MESSAGES, variables: { id } })

            if (error) return error
            return data.GetMessages
        })(),
        (async (): Promise<GetUserFromConversationReturn | Error> => {
            // fetches the other users details
            const { data, error } = await apollo.query<
                QueryReturn<
                    GetUserFromConversationReturn,
                    'UserFromConversationReturn',
                    'GetUserIdFromConversationId'
                >,
                GetUserIdFromConversationArgs
            >({
                query: GET_USER_ID_FROM_CONVERSATION,
                variables: {
                    conversationId: id,
                    email: session.user.email as string,
                },
            })

            if (error) return error
            return data.GetUserIdFromConversationId
        })(),
    ])
    return val
}

const Page = async ({
    params,
}: {
    params: { id: string }
}): Promise<ReactElement> => {
    const [messages, user] = await getData(params.id)
    if (isError(messages)) throw messages // throws on error
    if (isError(user)) throw user

    return (
        <>
            <div className={styles.header}>
                <ProfilePicture image={user.id} width={100} height={100} />
                <Text header>
                    {user.firstName} {user.lastName}
                </Text>
            </div>
            <MessagingProvider
                fetchedMessages={messages}
                conversationId={params.id}
                userId=""
            >
                <Messages />
                <MessageInput />
            </MessagingProvider>
        </>
    )
}

export default Page
