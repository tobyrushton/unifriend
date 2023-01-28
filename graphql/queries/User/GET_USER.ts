import { gql } from '@apollo/client'

export const GET_USER = gql`
    query MyQuery(
        $id: String!
        $universityPreference: String!
        $university: String!
    ) {
        user(
            id: $id
            universityPreference: $universityPreference
            university: $university
        ) {
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
