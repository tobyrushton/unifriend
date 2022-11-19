import { useMutation } from '@apollo/client'
import { useState } from 'react'
import {
    UserObject,
    UserObjectWithID,
    graphQLHookReturnMutation,
} from '../../../types/index'
import { CreateUserMutation } from '../../../graphql/queries'

export const useCreateUser = (): graphQLHookReturnMutation<UserObject> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    // creates a function thas uses the graphql mutation previously defined to create a user.
    const [createUser] = useMutation<UserObjectWithID, UserObject>(
        CreateUserMutation,
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
        success,
        loading,
        error,
        mutation: createUser as () => Promise<UserObjectWithID>,
    } as const
}
