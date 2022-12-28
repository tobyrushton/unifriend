import { gql } from 'apollo-server-micro'

export const GET_CONVERSATION = gql`
    query Query($id: String!) {
        getConversations(id: $id) {
            id
            usersId
            username
        }
    }
`
