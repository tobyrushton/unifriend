export interface Message {
    message: string
    senderId: string
    conversationId: string
    seen: boolean
    sentAt: any[] // temp data type
}

export interface MessageWithId extends Message {
    id: string
}

export type MessageId = {
    id: string
}
