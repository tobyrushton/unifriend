'use client'

import { FC, createContext, useState, useMemo } from 'react'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_TO_MESSAGES } from '../../graphql/queries'
import {
    IDArguement,
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

    useSubscription<MessageWithId, IDArguement>(SUBSCRIBE_TO_MESSAGES, {
        variables: { id: conversationId },
        onData: ({ data: { data } }) => {
            if (data) addMessage(data)
        },
    })

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
