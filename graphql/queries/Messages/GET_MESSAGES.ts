import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
    query GetMessages($id: String!) {
        GetMessages(id: $id) {
            message
            conversationId
            id
            senderId
            seen
            sentAt
        }
    }
`
