import { gql } from '@apollo/client'

export const GET_FRIEND_REQUESTS_BY_ID = gql`
    query Query($id: String!) {
        getFriendRequests(friendID: $id) {
            id
            username
            rowId
            fullName
        }
    }
`
