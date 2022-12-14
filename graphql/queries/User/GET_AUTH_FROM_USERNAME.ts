import { gql } from 'apollo-server-micro'

export const GET_AUTH_FROM_USERNAME = gql`
    query Query($username: String!) {
        getAuthFromUsername(username: $username) {
            email
        }
    }
`
