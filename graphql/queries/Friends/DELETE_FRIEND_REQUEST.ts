import { gql } from '@apollo/client'

export const DELETE_FRIEND_REQUEST = gql`
    mutation Mutation($id: String!) {
        deleteFriendRequest(id: $id) {
            id
        }
    }
`
