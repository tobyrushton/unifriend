import { gql } from 'apollo-server-micro'

export const UserByIDQuery = gql`
    query Query(
        $id: String!
        $firstName: Boolean
        $lastName: Boolean
        $university: Boolean
        $course: Boolean
        $birthday: Boolean
        $bio: Boolean
        $username: Boolean
    ) {
        users(
            id: $id
            firstName: $firstName
            lastName: $lastName
            university: $university
            course: $course
            birthday: $birthday
            bio: $bio
            username: $username
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
