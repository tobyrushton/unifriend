import 'server-only'

import { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    ChildrenProps,
    QueryReturn,
    IDArguement,
    Join,
    EmailQuery,
    UserByEmailOptions,
    ConversationReturn,
} from '../../../types'
import { ProfilePicture } from '../../../components'
import { getServerSideSupabase } from '../../../lib/supabase'
import { initiateApollo } from '../../../lib/apollo'
import {
    GET_USER_BY_EMAIL_OPTIONAL,
    GET_CONVERSATION,
} from '../../../graphql/queries'
import styles from '../../../styles/modules/Messages.module.scss'

const getData = async (): Promise<ConversationReturn[]> => {
    const supabase = getServerSideSupabase()
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session === null) throw new Error('invalid session')

    const apollo = initiateApollo()

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

    const { data } = await apollo.query<
        QueryReturn<ConversationReturn[], 'test', 'getConversations'>,
        IDArguement
    >({ query: GET_CONVERSATION, variables: { id } })

    return data.getConversations
}

const MessagesLayout = async ({
    children,
}: ChildrenProps): Promise<ReactElement> => {
    const conversations = await getData()

    return (
        <>
            <div className={`${styles.marginTop} ${styles.sidebar}`}>
                <div className={styles.sidebarItem}>
                    <div className={styles.input}>
                        <Image
                            src="/search-icon.png"
                            width={15}
                            height={15}
                            alt="search icon"
                        />
                        <input type="text" placeholder="Search messages" />
                    </div>
                    <Image
                        src="/New-message-icon.png"
                        alt="New message icon"
                        className={styles.newMessage}
                        width={20}
                        height={20}
                    />
                </div>
                {conversations?.map((conversation, idx) => (
                    <div
                        className={styles.sidebarItem}
                        key={'conversation'.concat(idx.toString())}
                    >
                        <ProfilePicture
                            image={conversation.usersId}
                            width={75}
                            height={75}
                        />
                        <Link
                            href={`/a/messages/${conversation.id}`}
                            className={styles.link}
                        >
                            {conversation.username}
                        </Link>
                    </div>
                ))}
            </div>
            <div className={`${styles.marginTop} ${styles.messagesContainer}`}>
                {children}
            </div>
        </>
    )
}

export default MessagesLayout
