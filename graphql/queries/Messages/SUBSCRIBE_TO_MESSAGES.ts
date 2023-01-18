import { gql } from '@apollo/client'

export const SUBSCRIBE_TO_MESSAGES = gql`
    subscription MySubscription($id: String!) {
        GetMessageUpdates(id: $id) {
            conversationId
            id
            message
            senderId
            seen
            sentAt
        }
    }
`
