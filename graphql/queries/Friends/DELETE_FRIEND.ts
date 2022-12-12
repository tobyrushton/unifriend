import { gql } from 'apollo-server-micro'

export const DELETE_FRIEND = gql`
    mutation Mutation($id: String!) {
        deleteFriend(id: $id) {
            id
        }
    }
`
