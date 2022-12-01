import { gql } from 'apollo-server-micro'

export const CheckUsernameIsTakenQuery = gql`
    query Query($username: String!) {
        CheckUsernameIsTaken(username: $username)
    }
`
