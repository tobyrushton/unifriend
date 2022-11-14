import { gql } from 'apollo-server-micro'

export const DeleteUserMutation = gql`
    mutation Mutation($userID: String!) {
        deleteUser(id: $userID) {
            id
        }
    }
`
