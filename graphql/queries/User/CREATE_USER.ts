import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation Mutation(
        $firstName: String!
        $lastName: String!
        $birthday: String!
        $university: String!
        $course: String!
        $username: String!
        $email: String!
    ) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            birthday: $birthday
            university: $university
            course: $course
            username: $username
            email: $email
        ) {
            bio
            birthday
            course
            firstName
            lastName
            settings {
                darkMode
                universityPreference
                usersId
            }
            university
            username
            email
        }
    }
`
