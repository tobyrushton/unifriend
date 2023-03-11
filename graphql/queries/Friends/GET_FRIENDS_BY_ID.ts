import { gql } from '@apollo/client'

export const GET_FRIENDS_BY_ID = gql`
    query Query($id: String!) {
        getFriends(usersId: $id) {
            id
            username
            rowId
            fullName
        }
    }
`
