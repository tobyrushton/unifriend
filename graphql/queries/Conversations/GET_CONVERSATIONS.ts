import { gql } from '@apollo/client'

export const GET_CONVERSATIONS = gql`
    query Query($id: String!) {
        getConversations(id: $id) {
            id
            usersId
            username
        }
    }
`
