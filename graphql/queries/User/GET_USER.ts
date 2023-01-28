import { gql } from '@apollo/client'

export const GET_USER = gql`
    query MyQuery {
        user {
            bio
            course
            birthday
            email
            firstName
            id
            lastName
            university
            username
        }
    }
`
