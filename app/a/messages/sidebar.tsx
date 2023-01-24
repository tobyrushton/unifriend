'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProfilePicture, Input } from '../../../components'
import {
    ConversationReturn,
    QueryReturn,
    SelectUserByIDParameters,
    NewConversationUser,
} from '../../../types'
import { useUser, useQuery, useNotifications } from '../../../hooks'
import { GET_USER_BY_ID } from '../../../graphql/queries'
import { New } from './new'
import styles from '../../../styles/modules/Messages.module.scss'

export const Sidebar: FC<{ fetchedConversations: ConversationReturn[] }> = ({
    fetchedConversations,
}) => {
    const [conversations, setConversations] =
        useState<ConversationReturn[]>(fetchedConversations)
    const [search, setSearch] = useState<string>('')
    const [selected, setSelected] = useState<number | null>(null)
    const [displayNewMessage, setDisplayNewMessage] = useState<boolean>(false)
    const [newConversationUsers, setNewConversationUsers] = useState<
        NewConversationUser[]
    >([])

    const { friends, user } = useUser()
    const { query } = useQuery()
    const { createNotification } = useNotifications()

    const filter = (): void => {
        setConversations(
            fetchedConversations.filter(val => val.username.includes(search))
        )
    }

    useEffect(filter, [search, fetchedConversations])

    useEffect(() => {
        Promise.all(
            friends.map(friend =>
                (async (): Promise<NewConversationUser> => {
                    const id =
                        friend.friendID === user.id
                            ? friend.userId
                            : friend.friendID

                    const { data, error } = await query<
                        QueryReturn<NewConversationUser, 'users', 'users'>,
                        SelectUserByIDParameters
                    >({
                        query: GET_USER_BY_ID,
                        id,
                        firstName: true,
                        lastName: true,
                        username: true,
                    })

                    if (error)
                        createNotification({
                            type: 'error',
                            content: error.message,
                        })

                    const { __typename, ...fetchedUser } = (
                        data as QueryReturn<
                            NewConversationUser,
                            'users',
                            'users'
                        >
                    ).users

                    return { ...fetchedUser, id }
                })()
            )
        ).then(val => {
            setNewConversationUsers(val)
        })
    }, [createNotification, friends, query, user.id])

    return (
        <>
            <div className={styles.sidebarItem}>
                <div className={styles.input}>
                    <Image
                        src="/search-icon.png"
                        width={15}
                        height={15}
                        alt="search icon"
                    />
                    <Input
                        type="text"
                        placeholder="Search messages"
                        setValue={setSearch}
                    />
                </div>
                <button
                    className={styles.messageButton}
                    onClick={() => setDisplayNewMessage(true)}
                    type="button"
                    tabIndex={0}
                >
                    <Image
                        src="/New-message-icon.png"
                        alt="New message icon"
                        className={styles.newMessage}
                        width={20}
                        height={20}
                    />
                </button>
            </div>
            {conversations?.map((conversation, idx) => (
                <div
                    className={
                        idx === selected
                            ? styles.sidebarItem
                            : `${styles.sidebarItem} ${styles.selected}`
                    }
                    key={'conversation'.concat(idx.toString())}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelected(idx)}
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
            {displayNewMessage ? (
                <New
                    exit={() => setDisplayNewMessage(false)}
                    users={newConversationUsers}
                />
            ) : null}
        </>
    )
}
