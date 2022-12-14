import { gql } from 'apollo-server-micro'

export const CHECK_USERNAME_IS_TAKEN = gql`
    query Query($username: String!) {
        CheckUsernameIsTaken(username: $username)
    }
`
