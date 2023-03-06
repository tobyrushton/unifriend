import { gql } from '@apollo/client'

export const GET_USER = gql`
    query MyQuery(
        $id: String!
        $universityPreference: String!
        $university: String!
        $take: Int
    ) {
        user(
            id: $id
            universityPreference: $universityPreference
            university: $university
            take: $take
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
