import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import {
    graphQLHookReturnQuery,
    UserObjectWithID,
    SelectUserByIDParameters,
} from '../../../types'

// graphql query defintion to get all user information
const UserByIDQuery = gql`
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

export const useGetUserByID = (
    options: SelectUserByIDParameters
): graphQLHookReturnQuery => {
    // defines state types which allow for dynamic return values
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    // creates a query to the database using the grapql query previously defined.
    const { data, loading } = useQuery<
        UserObjectWithID,
        SelectUserByIDParameters
    >(UserByIDQuery, {
        onError: err => {
            // updates state on error
            setError(err)
            setSuccess(false)
        },
        onCompleted: () => {
            // updates state on completion
            setSuccess(true)
        },
        variables: options,
    })

    return {
        loading,
        error,
        success,
        data: data as UserObjectWithID,
    }
}
