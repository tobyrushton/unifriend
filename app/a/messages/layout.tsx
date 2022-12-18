'use client'

import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery, useNotifications, useLoadingScreen } from '../../../hooks'
import { ChildrenProps, Conversation } from '../../../types'
import { ProfilePicture } from '../../../components'
import styles from '../../../styles/modules/Messages.module.scss'

const MessagesLayout: FC<ChildrenProps> = ({ children }) => {
    const [conversations, setConversations] = useState<Conversation[]>(() =>
        new Array<Conversation>(20).fill({
            id: '1234',
            user: {
                id: '1234',
                username: 'testUser',
            },
            lastMessage: new Date(),
            unreadMessages: 0,
        })
    )

    const { loading, query } = useQuery()
    const { createNotification } = useNotifications()
    const { setLoading } = useLoadingScreen()

    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

    useEffect(() => {
        // logic to fetch conversations here.
        // changes to db will have to be made for new 'conversations' table.
        // sorted by date.
        // redifine messages table to have conversationId and the user who sent it, content and time.
    }, [query, createNotification, setConversations])

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
                            image={conversation.user.id}
                            width={75}
                            height={75}
                        />
                        <Link
                            href={`/a/messages/${conversation.user.id}`}
                            className={styles.link}
                        >
                            {' '}
                            {conversation.user.username}{' '}
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
