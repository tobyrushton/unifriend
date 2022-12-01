import { gql } from 'apollo-server-micro'

export const UpdateSettingsMutation = gql`
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
