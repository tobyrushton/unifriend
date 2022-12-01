import { useState, useMemo, useEffect } from 'react'
import { useApolloClient, DocumentNode } from '@apollo/client'
import { graphQLHookReturnQueryFunction, QueryReturn } from '../../types'

// not yet fully implemented
export const useQuery = <Args, Return extends object, T extends string>(
    gql: DocumentNode,
    attribute: string
): graphQLHookReturnQueryFunction<Args, Return> => {
    const [abort] = useState<AbortController>(new AbortController())
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Return>()

    const apollo = useApolloClient()

    const runQuery = useMemo(
        () =>
            async (args: Args): Promise<void> => {
                setLoading(true)
                setSuccess(false)
                await apollo
                    .query<QueryReturn<Return, typeof attribute, T>, Args>({
                        query: gql,
                        variables: args,
                        context: {
                            fetchOptions: {
                                abort: abort.signal,
                            },
                        },
                    })
                    .catch(e => setError(e))
                    .then(response => {
                        if (response) {
                            setData(response.data[attribute])
                            setLoading(false)
                            setSuccess(true)
                        }
                    })
            },
        [abort.signal, apollo]
    )

    useEffect(() => {
        return () => abort.abort()
    }, [abort])

    return {
        error,
        success,
        loading,
        data: data as Return,
        runQuery,
    }
}
