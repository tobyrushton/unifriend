import { gql } from '@apollo/client'

export const GET_USER_BY_EMAIL_OPTIONAL = gql`
    query UserQueryByEmail(
        $email: String!
        $firstName: Boolean
        $lastName: Boolean
        $university: Boolean
        $birthday: Boolean
        $course: Boolean
        $bio: Boolean
        $settings: Boolean
        $id: Boolean
        $username: Boolean
        $all: Boolean
    ) {
        UserQueryByEmail(
            email: $email
            firstName: $firstName
            lastName: $lastName
            university: $university
            birthday: $birthday
            course: $course
            bio: $bio
            settings: $settings
            id: $id
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
            settings {
                universityPreference
                darkMode
            }
            email
        }
    }
`
