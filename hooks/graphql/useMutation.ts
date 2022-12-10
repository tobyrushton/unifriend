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
        let errors: readonly Error[] | undefined
        let success = false
        // executes mutation
        try {
            const { errors: mutationErrors, data } = await apollo.mutate<
                Return,
                Params
            >({
                mutation,
                variables,
            })

            errors = mutationErrors as unknown as Error[]
            success = !!data
        } catch (e) {
            errors = [e as Error]
        }

        setLoading(false)

        return {
            error: errors,
            success,
        }
    }

    return {
        loading,
        mutation: runMutation,
    } as const
}
