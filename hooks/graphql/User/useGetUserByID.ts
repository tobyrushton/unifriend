import { useQuery } from '@apollo/client'
import { useState } from 'react'
import {
    graphQLHookReturnQuery,
    UserObjectWithID,
    SelectUserByIDParameters,
} from '../../../types'
import { UserByIDQuery } from '../../../graphql/queries'

export const useGetUserByID = (
    options: SelectUserByIDParameters
): graphQLHookReturnQuery => {
    // defines state types which allow for dynamic return values
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    // creates a query to the database using the grapql query previously defined.
    const { data, loading } = useQuery<
        UserObjectWithID,
        SelectUserByIDParameters
    >(UserByIDQuery, {
        onError: err => {
            // updates state on error
            setError(err)
            setSuccess(false)
        },
        onCompleted: () => {
            // updates state on completion
            setSuccess(true)
        },
        variables: options,
    })

    return {
        loading,
        error,
        success,
        data: data as UserObjectWithID,
    }
}
