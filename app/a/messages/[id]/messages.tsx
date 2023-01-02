'use client'

import { FC } from 'react'
import { MessageWithId } from '../../../../types'
import { Message } from '../../../../components'
import { useUser } from '../../../../hooks'
import styles from '../../../../styles/modules/Messages.module.scss'

export const Messages: FC<{ messages: MessageWithId[] }> = ({ messages }) => {
    const { user } = useUser()

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
        </div>
    )
}
