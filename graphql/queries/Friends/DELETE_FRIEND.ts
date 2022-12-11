import { gql } from 'apollo-server-micro'

export const DELETE_FRIEND = gql`
    mutation Mutation($id: string) {
        deleteFriend(id: $id) {
            id
        }
    }
`
