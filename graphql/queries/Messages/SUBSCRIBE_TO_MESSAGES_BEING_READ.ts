import { gql } from '@apollo/client'

export const SUBSCRIBE_TO_MESSAGES_BEING_READ = gql`
    subscription MySubscription($id: String!) {
        MarkMessageAsRead(id: $id) {
            id
        }
    }
`
