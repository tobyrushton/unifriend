export interface Message {
    message: string
    senderID: string
    recipientID: string
    seen: boolean
    sentAt: any[] // temp data type
}

export interface MessageWithId extends Message {
    id: number
}

export type MessageId = {
    id: number
}
