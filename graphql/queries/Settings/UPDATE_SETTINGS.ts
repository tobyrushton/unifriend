import { gql } from 'apollo-server-micro'

export const UPDATE_SETTINGS = gql`
    mutation Mutation(
        $id: String!
        $universityPreference: String
        $darkMode: Boolean
    ) {
        UpdateSettings(
            usersId: $id
            universityPreference: $universityPreference
            darkMode: $darkMode
        ) {
            universityPreference
            darkMode
        }
    }
`
