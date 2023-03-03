import { gql } from '@apollo/client'

export const DELETE_MESSAGE = gql`
    mutation MyMutation($id: String!) {
        deleteMessage(id: $id) {
            id
        }
    }
`
