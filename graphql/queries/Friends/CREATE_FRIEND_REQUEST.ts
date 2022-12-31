import { gql } from '@apollo/client'

export const CREATE_FRIEND_REQUEST = gql`
    mutation Mutation($friendId: String!, $usersId: String!) {
        createFriendRequest(friendID: $friendId, usersId: $usersId) {
            friendID
            usersId
            createdAt
        }
    }
`
