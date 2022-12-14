import { gql } from 'apollo-server-micro'

export const GET_USER_BY_ID = gql`
    query Query(
        $id: String!
        $firstName: Boolean
        $lastName: Boolean
        $university: Boolean
        $course: Boolean
        $birthday: Boolean
        $bio: Boolean
        $username: Boolean
        $all: Boolean
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
            all: $all
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
