import { gql } from '@apollo/client'

export const GET_CONVERSATION = gql`
    query Query($id: String!) {
        getConversations(id: $id) {
            id
            usersId
            username
        }
    }
`
