import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import {
    UserObjectWithID,
    SelectUserByIDParameters,
    graphQLHookReturnQueryFunction,
} from '../../../types'
import { UserByIDQuery } from '../../../graphql/queries'

export const useGetUserByID =
    (): graphQLHookReturnQueryFunction<SelectUserByIDParameters> => {
        // defines state types which allow for dynamic return values
        const [error, setError] = useState<Error>()
        const [success, setSuccess] = useState<boolean>(false)
        const [loading, setLoading] = useState<boolean>(false)
        const [data, setData] = useState<UserObjectWithID>()

        const apollo = useApolloClient()

        const runQuery = async (
            args: SelectUserByIDParameters
        ): Promise<void> => {
            setLoading(true)
            // creates a query to the database using the grapql query previously defined.
            await apollo
                .query<UserObjectWithID, SelectUserByIDParameters>({
                    query: UserByIDQuery,
                    variables: args,
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
        }

        return {
            loading,
            error,
            success,
            data: data as UserObjectWithID,
            runQuery,
        }
    }
