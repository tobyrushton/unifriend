'use client'

import { FC, createContext, useState, useMemo, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { useUser } from '../../hooks/providers/useUser'
import { useMutation } from '../../hooks/graphql/useMutation'
import {
    MARK_MESSAGE_AS_READ,
    SUBSCRIBE_TO_MESSAGES,
    SUBSCRIBE_TO_MESSAGES_BEING_READ,
    SUBSCRIBE_TO_DELETED_MESSAGES,
} from '../../graphql/queries'
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

    const { user } = useUser()
    const { mutation } = useMutation()

    // adds a message to the messages array
    const addMessage = (newMessage: MessageWithId): void => {
        setMessages(prevState => {
            const temp = structuredClone(prevState)
            temp.push(newMessage)
            return temp
        })
    }

    // marks all messages as read
    const setMessagesToRead = useMemo(
        () => async (): Promise<void> => {
            const unreadMessages = structuredClone(messages).filter(
                ({ seen, senderId }) => !seen && senderId !== user.id
            )

            // executes the mutations in parallel
            Promise.all(
                unreadMessages.map(({ id }) =>
                    (async (): Promise<void> => {
                        // marks the message as read
                        await mutation<IDArguement, IDArguement>({
                            mutation: MARK_MESSAGE_AS_READ,
                            id,
                        })
                    })()
                )
            )
        },
        [messages, mutation, user.id]
    )

    // marks all messages as read when the messages array is updated
    useEffect(() => {
        setMessagesToRead()
    }, [messages, user.id, setMessagesToRead])

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

    useSubscription<
        QueryReturn<IDArguement, 'IDArguement', 'MarkMessageAsRead'>,
        IDArguement
    >(SUBSCRIBE_TO_MESSAGES_BEING_READ, {
        variables: { id: conversationId },
        onData: ({ data: { data } }) => {
            setMessages(prevState =>
                structuredClone(prevState).map(message => {
                    if (message.id === data?.MarkMessageAsRead?.id) {
                        return {
                            ...message,
                            seen: true,
                        }
                    }
                    return message
                })
            )
        },
    })

    useSubscription<
        QueryReturn<IDArguement, 'IDArguement', 'DeletedMessages'>,
        IDArguement
    >(SUBSCRIBE_TO_DELETED_MESSAGES, {
        variables: { id: conversationId },
        onData: ({ data: { data } }) => {
            setMessages(prevState =>
                structuredClone(prevState).filter(
                    message => message.id !== data?.DeletedMessages?.id
                )
            )
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
