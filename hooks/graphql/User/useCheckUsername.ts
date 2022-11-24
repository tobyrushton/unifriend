import { useState, useMemo, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { CheckUsernameIsTakenQuery } from '../../../graphql/queries'
import {
    graphQLHookReturnQueryFunction,
    CheckUsernameArgs,
    BooleanReturn,
    CheckUsernameIsTakenQuery as CheckUsernameIsTakenQueryType,
} from '../../../types'

export const useCheckUsername = (): graphQLHookReturnQueryFunction<
    CheckUsernameArgs,
    BooleanReturn
> => {
    const [abort] = useState<AbortController>(new AbortController())
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<BooleanReturn>()

    const apollo = useApolloClient()

    const runQuery = useMemo(
        () =>
            async (args: CheckUsernameArgs): Promise<void> => {
                setLoading(true)
                setSuccess(false)
                await apollo
                    .query<
                        CheckUsernameIsTakenQueryType<boolean>,
                        CheckUsernameArgs
                    >({
                        query: CheckUsernameIsTakenQuery,
                        variables: args,
                        context: {
                            fetchOptions: {
                                abort: abort.signal,
                            },
                        },
                    })
                    .catch(e => setError(e))
                    .then(response => {
                        console.log(response)
                        if (response) {
                            setData({
                                result: response.data.CheckUsernameIsTaken,
                            })
                            setLoading(false)
                            setSuccess(true)
                        }
                    })
            },
        [abort.signal, apollo]
    )

    useEffect(() => {
        return () => abort.abort()
    }, [])

    return {
        error,
        success,
        loading,
        data: data as BooleanReturn,
        runQuery,
    }
}
