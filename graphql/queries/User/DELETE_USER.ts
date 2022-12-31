import { gql } from '@apollo/client'

export const DELETE_USER = gql`
    mutation Mutation($userID: String!) {
        deleteUser(id: $userID) {
            id
        }
    }
`
