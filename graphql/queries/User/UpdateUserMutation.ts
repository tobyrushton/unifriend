import { gql } from 'apollo-server-micro'

export const UpdateUserMutation = gql`
    mutation UpdateUser(
        $id: String!
        $firstName: String
        $lastName: String
        $birthday: String
        $university: String
        $course: String
        $username: String
        $bio: String
    ) {
        updateUser(
            id: $id
            firstName: $firstName
            lastName: $lastName
            birthday: $birthday
            university: $university
            course: $course
            username: $username
            bio: $bio
        ) {
            id
            firstName
            lastName
            university
            course
            birthday
            username
            bio
        }
    }
`
