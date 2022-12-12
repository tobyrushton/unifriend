import { gql } from 'apollo-server-micro'

export const GET_FRIEND_REQUESTS_BY_ID = gql`
    query Query($id: String!) {
        getFriendRequests(friendID: $id) {
            id
            username
            rowId
        }
    }
`
