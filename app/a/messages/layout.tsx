import 'server-only'

import { ReactElement } from 'react'
import {
    ChildrenProps,
    QueryReturn,
    IDArguement,
    Join,
    EmailQuery,
    UserByEmailOptions,
    ConversationReturn,
} from '../../../types'
import { getServerSideSupabase } from '../../../lib/supabase'
import { initiateApollo } from '../../../lib/apollo'
import {
    GET_USER_BY_EMAIL_OPTIONAL,
    GET_CONVERSATIONS,
} from '../../../graphql/queries'
import styles from '../../../styles/modules/Messages.module.scss'
import { Sidebar } from './sidebar'

// fetches the users conversations
const getData = async (): Promise<ConversationReturn[]> => {
    const supabase = getServerSideSupabase()
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session === null) throw new Error('invalid session')

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

    if (userError) throw userError

    // fetches the users conversations
    const { data } = await apollo.query<
        QueryReturn<ConversationReturn[], 'test', 'getConversations'>,
        IDArguement
    >({ query: GET_CONVERSATIONS, variables: { id } })

    return data.getConversations
}

const MessagesLayout = async ({
    children,
}: ChildrenProps): Promise<ReactElement> => {
    const conversations = await getData()

    return (
        <div className={styles.marginTop}>
            <div className={`${styles.sidebar}`}>
                <Sidebar fetchedConversations={conversations} />
            </div>
            <div className={`${styles.messagesContainer}`}>{children}</div>
        </div>
    )
}

export default MessagesLayout
