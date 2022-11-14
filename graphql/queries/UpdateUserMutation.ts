import { gql } from 'apollo-server-micro'

export const UpdateUserMutation = gql`
    mutation UpdateUser(
        $userId: String!
        $firstName: String
        $lastName: String
        $birthday: String
        $university: String
        $course: String
        $username: String
        $bio: String
    ) {
        updateUser(
            id: $userId
            firstName: $firstName
            lastName: $lastName
            birthday: $birthday
            university: $university
            course: $course
            username: $username
            bio: $bio
        ) {
            userId
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
