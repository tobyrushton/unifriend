import { gql } from 'apollo-server-micro'

export const DELETE_FRIEND = gql`
    mutation Mutation($friendId: String!, $usersId: String!) {
        deleteFriend(friendID: $friendId, usersId: $usersId) {
            id
        }
    }
`
