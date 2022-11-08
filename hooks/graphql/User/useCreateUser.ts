import { gql, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import {
    UserObject,
    UserObjectWithID,
    graphQLHookReturn,
} from '../../../types/index'

// graphql mutation defined in order to interact with API
const CreateUserMutation = gql`
    mutation Mutation(
        $firstName: String!
        $lastName: String!
        $birthday: String!
        $university: String!
        $course: String!
        $username: String!
    ) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            birthday: $birthday
            university: $university
            course: $course
            username: $username
        ) {
            firstName
            lastName
            university
            course
            birthday
            username
            bio
        }
    }
`

export const useCreateUser = (user: UserObject): graphQLHookReturn => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    // creates a function thas uses the graphql mutation previously defined to create a user.
    const [createUser] = useMutation<UserObjectWithID, UserObject>(
        CreateUserMutation,
        {
            onError: err => {
                // updates state on error
                setError(err)
                setSuccess(false)
                setLoading(false)
            },
            onCompleted: () => {
                // updates state on completion
                setSuccess(true)
                setLoading(false)
            },
        }
    )

    // useEffect runs create user function once.
    useEffect(() => {
        createUser({ variables: user })
    }, [])

    return {
        success,
        loading,
        error,
    } as const
}
