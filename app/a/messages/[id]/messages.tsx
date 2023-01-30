'use client'

import { FC, useEffect, useRef } from 'react'
import { Message } from '../../../../components'
import { useUser, useMessages } from '../../../../hooks'
import styles from '../../../../styles/modules/Messages.module.scss'

export const Messages: FC = () => {
    // hooks
    const { user } = useUser()
    const { messages } = useMessages()

    // ref to the bottom of the messages
    const bottom = useRef<HTMLDivElement | null>(null)

    const scrollToBottom = (): void => {
        bottom.current?.scrollIntoView()
    }

    // scrolls to the bottom of the messages when the messages are updated
    useEffect(scrollToBottom, [messages.length])

    return (
        <div className={styles.messageContainer}>
            {messages.map((message, idx) => (
                <Message
                    recieved={message.senderId !== user.id}
                    key={'message'.concat(idx.toString())}
                >
                    {message.message}
                </Message>
            ))}
            <div ref={bottom} />
        </div>
    )
}
