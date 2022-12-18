import { UserFromConversation } from './User'

export interface Message {
    message: string
    senderID: string
    recipientID: string
    seen: boolean
    sentAt: any[] // temp data type
}

export interface MessageWithId extends Message {
    id: string
}

export type MessageId = {
    id: string
}

export type Conversation = {
    id: string
    user: UserFromConversation
    lastMessage: Date
    unreadMessages: number
}
