import { gql } from '@apollo/client'

export const GET_USER_ID_FROM_CONVERSATION = gql`
    query MyQuery($conversationId: String!, $email: String!) {
        GetUserIdFromConversationId(
            conversationId: $conversationId
            email: $email
        ) {
            id
            firstName
            lastName
        }
    }
`
