import { gql } from '@apollo/client'

export const CREATE_MESSAGE = gql`
    mutation MyMutation($id: String!, $message: String!, $senderId: String!) {
        createMessage(
            conversationId: $id
            message: $message
            senderId: $senderId
        ) {
            conversationId
            id
            message
            seen
            senderId
            sentAt
        }
    }
`
