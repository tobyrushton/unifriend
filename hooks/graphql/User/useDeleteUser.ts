import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { graphQLHookReturnMutation, UserObjectWithID } from '../../../types'
import { DeleteUserMutation } from '../../../graphql/queries'

export const useDeleteUser = (): graphQLHookReturnMutation<{
    userID: string
}> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(false)
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

    const mutation = async (args: {
        userID: string
    }): Promise<UserObjectWithID> => {
        setLoading(true)
        return (await deleteUser({ variables: args })) as UserObjectWithID
    }

    return {
        loading,
        error,
        success,
        mutation,
    }
}
