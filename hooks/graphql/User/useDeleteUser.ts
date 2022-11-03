import { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { graphQLHookReturn, UserObjectWithID } from '../../../types'

const DeleteUserMutation = gql`
    mutation Mutation($userID: String!) {
        deleteUser(id: $userID) {
            id
        }
    }
`

export const useDeleteUser = (userID: string): graphQLHookReturn => {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    const [deleteUser] = useMutation<UserObjectWithID, { userID: string }>(
        DeleteUserMutation,
        {
            onError: err => {
                setError(err)
                setSuccess(false)
                setLoading(false)
            },
            onCompleted: () => {
                setSuccess(true)
                setLoading(false)
            },
        }
    )

    useEffect(() => {
        deleteUser({ variables: { userID } })
    }, [])

    return {
        loading,
        error,
        success,
    }
}
