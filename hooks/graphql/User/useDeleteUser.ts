import { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { graphQLHookReturn, UserObjectWithID } from '../../../types'

// defines the graphql mutation needed in order to
const DeleteUserMutation = gql`
    mutation Mutation($userID: String!) {
        deleteUser(id: $userID) {
            id
        }
    }
`

export const useDeleteUser = (userID: string): graphQLHookReturn => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    // defines function deleteUser that uses the mutation defined previously.
    const [deleteUser] = useMutation<UserObjectWithID, { userID: string }>(
        DeleteUserMutation,
        {
            onError: err => {
                // updates state on error
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

    // useEffect executes deleteUser once.
    useEffect(() => {
        deleteUser({ variables: { userID } })
    }, [])

    return {
        loading,
        error,
        success,
    }
}
