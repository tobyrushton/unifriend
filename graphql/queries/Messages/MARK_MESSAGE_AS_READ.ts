import { gql } from '@apollo/client'

export const MARK_MESSAGE_AS_READ = gql`
    mutation MyMutation($id: String!) {
        markMessageAsRead(id: $id) {
            id
        }
    }
`
