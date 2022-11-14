import { gql } from 'apollo-server-micro'

export const CreateUserMutation = gql`
    mutation Mutation(
        $firstName: String!
        $lastName: String!
        $birthday: String!
        $university: String!
        $course: String!
        $username: String!
    ) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            birthday: $birthday
            university: $university
            course: $course
            username: $username
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
        }
    }
`
