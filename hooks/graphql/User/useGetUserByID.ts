import { useApolloClient } from '@apollo/client'
import { useState, useEffect, useMemo } from 'react'
import {
    UserObjectWithID,
    SelectUserByIDParameters,
    graphQLHookReturnQueryFunction,
} from '../../../types'
import { UserByIDQuery } from '../../../graphql/queries'

export const useGetUserByID =
    (): graphQLHookReturnQueryFunction<SelectUserByIDParameters> => {
        // defines state types which allow for dynamic return values
        const [abort] = useState<AbortController>(new AbortController())
        const [error, setError] = useState<Error>()
        const [success, setSuccess] = useState<boolean>(false)
        const [loading, setLoading] = useState<boolean>(false)
        const [data, setData] = useState<UserObjectWithID>()

        const apollo = useApolloClient()

        const runQuery = useMemo(
            () =>
                async (args: SelectUserByIDParameters): Promise<void> => {
                    setLoading(true)
                    // creates a query to the database using the grapql query previously defined.
                    await apollo
                        .query<UserObjectWithID, SelectUserByIDParameters>({
                            query: UserByIDQuery,
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
                                setSuccess(true)
                                setLoading(false)
                            }
                        })
                },
            [abort.signal, apollo]
        )

        // aborts the query when the component derenders.
        useEffect(() => {
            return () => abort.abort()
        }, [abort])

        return {
            loading,
            error,
            success,
            data: data as UserObjectWithID,
            runQuery,
        }
    }
