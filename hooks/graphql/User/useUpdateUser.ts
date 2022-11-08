import { gql, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import {
    graphQLHookReturn,
    UpdateUserParamaters,
    UserObjectWithID,
} from '../../../types'

// graphql mutation definiton to update user
const UpdateUserMutation = gql`
    mutation UpdateUser(
        $userId: String!
        $firstName: String
        $lastName: String
        $birthday: String
        $university: String
        $course: String
        $username: String
        $bio: String
    ) {
        updateUser(
            id: $userId
            firstName: $firstName
            lastName: $lastName
            birthday: $birthday
            university: $university
            course: $course
            username: $username
            bio: $bio
        ) {
            userId
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

export const useUpdateUser = (
    updates: UpdateUserParamaters
): graphQLHookReturn => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    // defines function updateUser using the mutation defined previously.
    const [updateUser] = useMutation<UserObjectWithID, UpdateUserParamaters>(
        UpdateUserMutation,
        {
            onError: err => {
                // updates state on error.
                setError(err)
                setSuccess(false)
                setLoading(false)
            },
            onCompleted: () => {
                // updates state on completion
                setSuccess(true)
                setLoading(false)
            },
        }
    )

    // useEffect ensures that updateUser is executed once.
    useEffect(() => {
        updateUser({ variables: updates })
    }, [])

    return {
        loading,
        error,
        success,
    }
}
