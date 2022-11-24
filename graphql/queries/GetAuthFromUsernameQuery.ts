import { gql } from 'apollo-server-micro'

export const GetAuthFromUsername = gql`
    query Query($username: String!) {
        getAuthFromUsername(username: $username) {
            email
        }
    }
`
