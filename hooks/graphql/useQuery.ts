import { useState, useMemo, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import {
    ApolloQueryReturn,
    ApolloQueryFunction,
    Join,
    Query,
} from '../../types'

export const useQuery = (): ApolloQueryReturn => {
    // abort signal that aborts the query if not complete and componenet derenders
    const [abort] = useState<AbortController>(new AbortController())
    const [loading, setLoading] = useState<boolean>(false)

    // creates an instance of apollo client
    const apollo = useApolloClient()

    const runQuery: ApolloQueryFunction = useMemo(
        () =>
            async <Params, Return>({ query, ...vars }: Join<Query, Params>) => {
                const variables = { ...vars } as Params
                setLoading(true)
                let error: Error | undefined
                let data: Return | undefined

                try {
                    const { data: queryData, error: queryError } =
                        await apollo.query<Return, Params>({
                            query,
                            variables,
                            context: {
                                fetchOptions: {
                                    abort: abort.signal,
                                },
                            },
                        })
                    data = queryData
                    error = queryError
                } catch (e) {
                    error = e as Error
                }

                setLoading(false)

                return {
                    data,
                    error,
                }
            },
        [abort.signal, apollo]
    )

    useEffect(() => {
        return () => abort.abort()
    }, [abort])

    return {
        loading,
        query: runQuery,
    } as const
}
