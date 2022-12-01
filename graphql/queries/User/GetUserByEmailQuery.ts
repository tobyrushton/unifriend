import { gql } from 'apollo-server-micro'

export const UserByEmailQuery = gql`
    query Query($email: String!) {
        getUserFromAuth(email: $email) {
            bio
            birthday
            course
            email
            firstName
            id
            lastName
            university
            username
        }
    }
`
