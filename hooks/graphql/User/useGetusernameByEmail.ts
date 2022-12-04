import { useApolloClient } from '@apollo/client'
import { useState, useEffect, useMemo } from 'react'
import {
    ExperimentalQueryReturn,
    ExperimentalQueryFunctionReturn,
    emailQuery,
    GetEmailParams,
} from '../../../types'
import { GetAuthFromUsername } from '../../../graphql/queries'

export const useGetUserByID = (): ExperimentalQueryReturn<
    GetEmailParams,
    emailQuery
> => {
    // defines state types which allow for dynamic return values
    const [abort] = useState<AbortController>(new AbortController())
    const [error, setError] = useState<Error>()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<emailQuery>()

    const apollo = useApolloClient()

    const query = useMemo(
        () =>
            async (
                args: GetEmailParams
            ): Promise<ExperimentalQueryFunctionReturn<emailQuery>> => {
                setLoading(true)
                // creates a query to the database using the grapqhl query previously defined.
                await apollo
                    .query<emailQuery, GetEmailParams>({
                        query: GetAuthFromUsername,
                        variables: args,
                        context: {
                            fetchOptions: {
                                singal: abort.signal,
                            },
                        },
                    })
                    .catch(err => {
                        setError(err)
                    })
                    .then(response => {
                        if (response) {
                            setData(response.data)
                            setLoading(false)
                        }
                    })

                return {
                    data,
                    error,
                }
            },
        [abort.signal, apollo, data, error]
    )

    // aborts the query when the component derenders.
    useEffect(() => {
        return () => abort.abort()
    }, [abort])

    return {
        loading,
        query,
    }
}
