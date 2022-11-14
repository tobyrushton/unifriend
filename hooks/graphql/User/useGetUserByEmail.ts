import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import {
    UserObjectWithID,
    email,
    graphQLHookReturnQueryFunction,
} from '../../../types'
import { UserByEmailQuery } from '../../../graphql/queries'

// as this function will be designed differently, (for use inside a useEffect call back it will need to be designed differently)

export const useGetUserByEmail = (): graphQLHookReturnQueryFunction => {
    // defines state types which allow for dynamic return values
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)
    const [data, setData] = useState<UserObjectWithID | undefined>()
    const [loading, setLoading] = useState<boolean>(false)

    const apollo = useApolloClient()

    const runQuery = async (email: string): Promise<void> => {
        setLoading(true)
        const response = await apollo
            .query<UserObjectWithID, email>({
                query: UserByEmailQuery,
                variables: {
                    email,
                },
            })
            .catch(error => {
                setError(error)
            })
            .then(response => {
                if (response) {
                    setData(response.data)
                    setSuccess(true)
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
