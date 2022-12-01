import { useMutation as useApolloMutation, DocumentNode } from '@apollo/client'
import { useState } from 'react'
import { graphQLHookReturnMutation } from '../../types'

export const useMutation = <Args, Return>(
    gql: DocumentNode
): graphQLHookReturnMutation<Args, Return> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    // creates a function thas uses the graphql mutation previously defined to create a user
    const [exec] = useApolloMutation<Return, Args>(gql, {
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

    const mutation = async (args: Args): Promise<Return> => {
        setLoading(true)
        return (await exec({ variables: args })) as Return
    }

    return {
        success,
        loading,
        error,
        mutation,
    } as const
}
