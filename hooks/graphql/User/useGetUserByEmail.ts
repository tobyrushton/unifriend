import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import {
    UserObjectWithID,
    emailQuery,
    graphQLHookReturnQueryFunction,
    getUserFromAuthQuery,
} from '../../../types'
import { UserByEmailQuery } from '../../../graphql/queries'

// as this function will be designed differently, (for use inside a useEffect call back it will need to be designed differently)

export const useGetUserByEmail = (): graphQLHookReturnQueryFunction<string> => {
    // defines state types which allow for dynamic return values
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)
    const [data, setData] = useState<UserObjectWithID | undefined>()
    const [loading, setLoading] = useState<boolean>(false)

    const apollo = useApolloClient()

    const runQuery = async (email: string): Promise<void> => {
        setLoading(true)
        await apollo
            .query<getUserFromAuthQuery<UserObjectWithID, 'User'>, emailQuery>({
                query: UserByEmailQuery,
                variables: {
                    email,
                },
            })
            .catch(err => {
                setError(err)
            })
            .then(response => {
                if (response) {
                    const temp = response.data.getUserFromAuth
                    setData({
                        firstName: temp.firstName,
                        lastName: temp.lastName,
                        bio: temp.bio,
                        birthday: temp.birthday,
                        course: temp.course,
                        email: temp.email,
                        username: temp.username,
                        id: temp.id,
                        university: temp.university,
                    })
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
