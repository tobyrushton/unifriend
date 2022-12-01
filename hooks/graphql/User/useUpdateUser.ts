import { useMutation } from '@apollo/client'
import { useState } from 'react'
import {
    graphQLHookReturnMutation,
    UpdateUserParamaters,
    UserObjectWithID,
} from '../../../types'
import { UpdateUserMutation } from '../../../graphql/queries'

export const useUpdateUser = (): graphQLHookReturnMutation<
    UpdateUserParamaters,
    UserObjectWithID
> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(false)
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

    const mutation = async (
        args: UpdateUserParamaters
    ): Promise<UserObjectWithID> => {
        setLoading(true)
        return (await updateUser({ variables: args })) as UserObjectWithID
    }

    return {
        loading,
        error,
        success,
        mutation,
    }
}
