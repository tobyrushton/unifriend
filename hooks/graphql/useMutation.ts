import { OperationVariables, useApolloClient } from '@apollo/client'
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

    const runMutation: ApolloMutationFunction = async <Return, Params extends OperationVariables>({
        mutation,
        ...vars
    }: Join<Mutation, Params>) => {
        // gives correct type to variables
        const variables = { ...vars } as unknown as Params
        setLoading(true)
        let errors: readonly Error[] | undefined
        let success = false
        let data: Return | undefined
        // executes mutation
        try {
            const { errors: mutationErrors, data: mutationData } =
                await apollo.mutate<Return, Params>({
                    mutation,
                    variables,
                })

            errors = mutationErrors as unknown as Error[]
            success = !!mutationData
            if (mutationData) data = mutationData
        } catch (e) {
            errors = [e as Error]
        }

        setLoading(false)

        return {
            error: errors,
            success,
            data,
        }
    }

    return {
        loading,
        mutation: runMutation,
    } as const
}
