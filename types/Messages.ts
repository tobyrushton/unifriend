export interface Message {
    message: string
    senderId: string
    conversationId: string
    seen: boolean
    sentAt: Date
}

export interface MessageWithId extends Message {
    id: string
}

export type MessageId = {
    id: string
}
