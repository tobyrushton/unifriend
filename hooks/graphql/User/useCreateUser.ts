import { useMutation } from '@apollo/client'
import { useState } from 'react'
import {
    createUserObjectWithUniversity,
    UserObjectWithID,
    graphQLHookReturnMutation,
} from '../../../types/index'
import { CreateUserMutation } from '../../../graphql/queries'

export const useCreateUser = (): graphQLHookReturnMutation<
    createUserObjectWithUniversity,
    UserObjectWithID
> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    // creates a function thas uses the graphql mutation previously defined to create a user
    const [createUser] = useMutation<
        UserObjectWithID,
        createUserObjectWithUniversity
    >(CreateUserMutation, {
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
    })

    const mutation = async (
        args: createUserObjectWithUniversity
    ): Promise<UserObjectWithID> => {
        setLoading(true)
        return (await createUser({ variables: args })) as UserObjectWithID
    }

    return {
        success,
        loading,
        error,
        mutation,
    } as const
}
