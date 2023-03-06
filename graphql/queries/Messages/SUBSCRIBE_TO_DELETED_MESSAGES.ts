import { gql } from '@apollo/client'

export const SUBSCRIBE_TO_DELETED_MESSAGES = gql`
    subscription MySubscription($id: String!) {
        DeletedMessages(id: $id) {
            id
        }
    }
`
