'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Input } from '../../../../components'
import {
    useMessages,
    useMutation,
    useNotifications,
    useUser,
} from '../../../../hooks'
import { CREATE_MESSAGE } from '../../../../graphql/queries'
import { MessageWithId, SendMessageArgs } from '../../../../types'
import styles from '../../../../styles/modules/Messages.module.scss'

export const MessageInput: FC = () => {
    const [message, setMessage] = useState<string>('')

    // hooks
    const { mutation } = useMutation()
    const { createNotification } = useNotifications()
    const { user } = useUser()
    const { conversationId } = useMessages()

    // sends a message
    const handleSendMessage = async (): Promise<void> => {
        if (!message) return // if the message is empty, do nothing

        // mutation to send a message
        const { error } = await mutation<MessageWithId, SendMessageArgs>({
            mutation: CREATE_MESSAGE,
            id: conversationId,
            senderId: user.id,
            message,
        })

        if (error)
            error.forEach(e =>
                createNotification({ type: 'error', content: e.message })
            )
        setMessage('') // resets the message
    }

    return (
        <div className={styles.messageBar}>
            <form
                className={styles.inputForm}
                onSubmit={e => e.preventDefault()}
            >
                <Input
                    placeholder="send new message"
                    type="text"
                    setValue={setMessage}
                    value={message}
                />
                <button
                    className={styles.inputButton}
                    onClick={handleSendMessage}
                    type="submit"
                >
                    <Image
                        src="/send-arrow.png"
                        alt="send icon"
                        width={50}
                        height={50}
                    />
                </button>
            </form>
        </div>
    )
}
