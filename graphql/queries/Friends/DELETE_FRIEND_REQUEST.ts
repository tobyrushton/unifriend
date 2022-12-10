import { gql } from 'apollo-server-micro'

export const DELETE_FRIEND_REQUEST = gql`
    mutation Mutation($friendId: String!, $usersId: String!) {
        deleteFriendRequest(friendID: $friendId, usersId: $usersId) {
            id
        }
    }
`
