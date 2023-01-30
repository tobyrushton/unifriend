'use client'

import { FC, createContext, useState, useMemo } from 'react'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_TO_MESSAGES } from '../../graphql/queries'
import {
    IDArguement,
    MessageContextInterface,
    MessageWithId,
    MessagingProviderProps,
    QueryReturn,
} from '../../types'

export const MessagingContext = createContext<MessageContextInterface | null>(
    null
)

export const MessagingProvider: FC<MessagingProviderProps> = ({
    children,
    conversationId,
    fetchedMessages,
}) => {
    const [messages, setMessages] = useState<MessageWithId[]>(
        // reverse the messages so the newest messages are at the bottom
        structuredClone(fetchedMessages.reverse())
    )

    // adds a message to the messages array
    const addMessage = (newMessage: MessageWithId): void => {
        setMessages(prevState => {
            const temp = structuredClone(prevState)
            temp.push(newMessage)
            return temp
        })
    }

    // subscribes to new messages
    useSubscription<
        QueryReturn<MessageWithId, 'Message', 'GetMessageUpdates'>,
        IDArguement
    >(SUBSCRIBE_TO_MESSAGES, {
        variables: { id: conversationId },
        onData: ({ data: { data } }) => {
            // on new message received, add it to the messages array
            if (data?.GetMessageUpdates) {
                const { __typename, ...newMessage } = data.GetMessageUpdates
                addMessage(newMessage)
            }
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
