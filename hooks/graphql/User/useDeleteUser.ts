import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
    graphQLHookReturnMutation,
    UserObjectWithID,
    graphQLMutationParameters,
} from '../../../types'
import { DeleteUserMutation } from '../../../graphql/queries'

type userID = { userID: string }

export const useDeleteUser = (): graphQLHookReturnMutation<
    UserObjectWithID,
    {
        userID: string
    }
> => {
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

    return {
        loading,
        error,
        success,
        mutation: deleteUser as (
            args: graphQLMutationParameters<
                UserObjectWithID,
                {
                    userID: string
                }
            >
        ) => Promise<UserObjectWithID>,
    }
}
