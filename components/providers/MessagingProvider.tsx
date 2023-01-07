'use client'

import { FC, createContext, useState, useMemo } from 'react'
import {
    MessageContextInterface,
    MessageWithId,
    MessagingProviderProps,
} from '../../types'

export const MessagingContext = createContext<MessageContextInterface | null>(
    null
)

export const MessagingProvider: FC<MessagingProviderProps> = ({
    children,
    conversationId,
    fetchedMessages,
}) => {
    const [messages, setMessages] = useState<MessageWithId[]>(fetchedMessages)

    const addMessage = (newMessage: MessageWithId): void => {
        setMessages(prevState => {
            prevState.push(newMessage)
            return prevState
        })
    }

    const value: MessageContextInterface = useMemo(
        () => ({
            addMessage,
            messages,
            conversationId,
        }),
        [conversationId, messages]
    )

    return (
        <MessagingContext.Provider value={value}>
            {children}
        </MessagingContext.Provider>
    )
}
