import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import {
    ApolloMutationReturn,
    ApolloMutationFunction,
    Join,
    Mutation,
} from '../../types'

export const useMutation = (): ApolloMutationReturn => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(false)
    const apollo = useApolloClient()

    const runMutation: ApolloMutationFunction = async <Return, Params>({
        mutation,
        ...vars
    }: Join<Mutation, Params>) => {
        // gives correct type to variables
        const variables = { ...vars } as Params
        setLoading(true)

        // executes mutation
        const { errors, data } = await apollo.mutate<Return, Params>({
            mutation,
            variables,
        })

        return {
            error: errors,
            success: !!data,
        }
    }

    return {
        loading,
        mutation: runMutation,
    } as const
}
