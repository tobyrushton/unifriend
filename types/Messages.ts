export interface Message {
    message: string
    senderId: string
    conversationId: string
    seen: boolean
    sentAt: string // stored as iso date string
}

export interface MessageWithId extends Message {
    id: string
}

export type MessageId = {
    id: string
}

export type SendMessageArgs = {
    id: string
    senderId: string
    message: string
}

export interface MessageContextMenuInterface {
    x: number
    y: number
    clicked: boolean
    id: string
}

export interface MessageContextMenuProps {
    id: string
    position: {
        top: string
        left: string
    }
}
