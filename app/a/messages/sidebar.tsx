'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProfilePicture, Input } from '../../../components'
import { ConversationReturn } from '../../../types'
import styles from '../../../styles/modules/Messages.module.scss'

export const Sidebar: FC<{ fecthedConversations: ConversationReturn[] }> = ({
    fecthedConversations,
}) => {
    const [conversations, setConversations] =
        useState<ConversationReturn[]>(fecthedConversations)
    const [search, setSearch] = useState<string>('')
    const [selected, setSelected] = useState<number | null>(null)

    const filter = (): void => {
        setConversations(
            fecthedConversations.filter(val => val.username.includes(search))
        )
    }

    useEffect(filter, [search])

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
        </>
    )
}
