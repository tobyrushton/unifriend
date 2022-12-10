import { gql } from 'apollo-server-micro'

export const GET_FRIENDS_BY_ID = gql`
    query Query($id: String!) {
        getFriends(usersId: $id) {
            friendID
            friendedAt
            usersId
        }
    }
`
