import { gql } from '@apollo/client'

export const DELETE_FRIEND = gql`
    mutation Mutation($id: String!) {
        deleteFriend(id: $id) {
            id
        }
    }
`
