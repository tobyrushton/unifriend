import { Message } from './Messages'
import { UserObjectWithID } from './User'

export type ConversationFetch = {
    id: string
}

export type ConversationFetchOne = ConversationFetch & {
    userOne: UserObjectWithID
}

export type ConversationFetchTwo = ConversationFetch & {
    userTwo: UserObjectWithID
}

export type ConversationPartial = {
    id: string
    userOneId: string
    userTwoId: string
}

export type Conversation = ConversationPartial & {
    messages: Message[]
}

export type ConversationReturn = {
    id: string
    usersId: string
    username: string
}

export type GetUserIdFromConversationArgs = {
    conversationId: string
    email: string
}

export type GetUserFromConversationReturn = {
    id: string
    firstName: string
    lastName: string
}

export type NewConversationUser = {
    id: string
    firstName: string
    lastName: string
    username: string
}

export type NewConversationArgs = {
    userOneId: string
    userTwoId: string
}
