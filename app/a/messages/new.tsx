'use client'

import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Exit, Text, Input, ProfilePicture } from '../../../components'
import {
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
    ConversationReturn,
} from '../../../types'
import { CREATE_CONVERSATION } from '../../../graphql/queries'
import styles from '../../../styles/modules/Messages.module.scss'

export const New: FC<{
    exit: () => void
    users: NewConversationUser[]
    conversations: ConversationReturn[]
}> = ({ exit, users: fetchedUsers, conversations: fetchedConversations }) => {
    const [users, setUsers] = useState<NewConversationUser[]>(fetchedUsers)
    const [search, setSearch] = useState<string>('')

    // hooks
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
    const checkForConversation = (id: string): string | undefined => {
        // query to search for conversation
        return fetchedConversations.find(
            conversation => conversation.usersId === id
        )?.id
    }

    // creates a new conversation
    const createConversation = async (id: string): Promise<void> => {
        // check if conversation already exists
        const check = checkForConversation(id)
        if (check) router.push(`/a/messages/${check}`)
        else {
            // mutation to create a new conversation
            const { error, data } = await mutation<
                QueryReturn<
                    ConversationPartial,
                    'Conversation',
                    'CreateConversation'
                >,
                NewConversationArgs
            >({
                mutation: CREATE_CONVERSATION,
                userOneId: user.id,
                userTwoId: id,
            })
            if (error)
                error.forEach(err =>
                    createNotification({ type: 'error', content: err.message })
                )
            // on success router.push to conversation page.
            if (data) router.push(`/a/messages/${data.CreateConversation.id}`)
        }
    }

    // filters when search input changes
    useEffect(filter, [search, fetchedUsers])

    // synchornises the loading state with the loading state of the query and mutation hooks
    useEffect(() => {
        setLoading(mutationLoading)
    }, [mutationLoading, setLoading])

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
                                image={friend.id}
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
