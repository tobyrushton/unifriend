import { gql } from '@apollo/client'

export const CREATE_FRIEND = gql`
    mutation Mutation($friendId: String!, $usersId: String!) {
        createFriend(usersId: $usersId, friendID: $friendId) {
            friendID
            friendedAt
            usersId
        }
    }
`
