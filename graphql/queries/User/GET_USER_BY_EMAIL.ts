import { gql } from '@apollo/client'

export const GET_USER_BY_EMAIL = gql`
    query GetUserFromAuth($email: String!) {
        getUserFromAuth(email: $email) {
            bio
            birthday
            email
            course
            firstName
            id
            lastName
            university
            username
            settings {
                darkMode
                universityPreference
            }
        }
    }
`
