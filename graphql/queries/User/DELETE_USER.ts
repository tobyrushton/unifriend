import { gql } from 'apollo-server-micro'

export const DELETE_USER = gql`
    mutation Mutation($userID: String!) {
        deleteUser(id: $userID) {
            id
        }
    }
`
