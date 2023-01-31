'use client'

import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Exit, Text, Input, ProfilePicture } from '../../../components'
import {
    useQuery,
    useMutation,
    useUser,
    useNotifications,
    useLoadingScreen,
} from '../../../hooks'
import {
    ConversationPartial,
    NewConversationArgs,
    NewConversationUser,
    QueryReturn,
} from '../../../types'
import { CREATE_CONVERSATION, GET_CONVERSATION } from '../../../graphql/queries'
import styles from '../../../styles/modules/Messages.module.scss'

export const New: FC<{ exit: () => void; users: NewConversationUser[] }> = ({
    exit,
    users: fetchedUsers,
}) => {
    const [users, setUsers] = useState<NewConversationUser[]>(fetchedUsers)
    const [search, setSearch] = useState<string>('')

    // hooks
    const { query, loading: queryLoading } = useQuery()
    const { mutation, loading: mutationLoading } = useMutation()
    const { user } = useUser()
    const { createNotification } = useNotifications()
    const { setLoading } = useLoadingScreen()
    const router = useRouter()

    // filters users based on search input
    const filter = (): void => {
        const inp = search.toLowerCase()
        setUsers(
            structuredClone(fetchedUsers).filter(
                fetchedUser =>
                    `${fetchedUser.firstName} ${fetchedUser.lastName}`
                        .toLowerCase()
                        .includes(inp) ||
                    fetchedUser.username.toLowerCase().includes(inp)
            )
        )
    }

    // checks if a conversation already exists
    const checkForConversation = async (
        id: string
    ): Promise<string | undefined> => {
        // query to search for conversation
        const { data, error } = await query<
            ConversationPartial,
            NewConversationArgs
        >({ query: GET_CONVERSATION, userOneId: user.id, userTwoId: id })
        if (error) createNotification({ type: 'error', content: error.message })

        if (data) return data.id
        return undefined
    }

    // creates a new conversation
    const createConversation = async (id: string): Promise<void> => {
        // check if conversation already exists
        const check = await checkForConversation(id)
        if (check) router.push(`/a/messages/${check}`)

        // mutation to create a new conversation
        const { error, data } = await mutation<
            QueryReturn<
                ConversationPartial,
                'Conversation',
                'CreateConversation'
            >,
            NewConversationArgs
        >({ mutation: CREATE_CONVERSATION, userOneId: user.id, userTwoId: id })
        if (error)
            error.forEach(err =>
                createNotification({ type: 'error', content: err.message })
            )
        // on success router.push to conversation page.
        if (data) router.push(`/a/messages/${data.CreateConversation.id}`)
    }

    // filters when search input changes
    useEffect(filter, [search, fetchedUsers])

    // synchornises the loading state with the loading state of the query and mutation hooks
    useEffect(() => {
        setLoading(mutationLoading || queryLoading)
    }, [mutationLoading, queryLoading, setLoading])

    return (
        <div className={styles.fazed}>
            <div className={styles.newMessageContainer}>
                <Exit onClick={exit} />
                <Text>Create new message</Text>
                <Input
                    type="text"
                    placeholder="Search people"
                    setValue={setSearch}
                />
                <div className={styles.newItemList}>
                    {users.map((friend, idx) => (
                        <div
                            className={styles.newItem}
                            key={'newConversation'.concat(idx.toString())}
                            role="button"
                            onClick={() => createConversation(friend.id)}
                            tabIndex={0}
                        >
                            <ProfilePicture
                                image={user.id}
                                width={50}
                                height={50}
                            />
                            <div className={styles.newItemText}>
                                <Text>
                                    {friend.firstName} {friend.lastName}
                                </Text>
                                <Text small>@{friend.username}</Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
