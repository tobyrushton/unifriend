import { Message } from './Messages'

export type Conversation = {
    id: string
    userOneId: string
    userTwoId: string
    messages: Message[]
}
