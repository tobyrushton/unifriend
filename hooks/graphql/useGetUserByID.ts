import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import {
    graphQLHookReturnQuery,
    UserObjectWithID,
    SelectUserByIDParameters,
} from '../../types'

const UserByIDQuery = gql`
    query Query(
        $id: String!
        $firstName: Boolean
        $lastName: Boolean
        $university: Boolean
        $course: Boolean
        $birthday: Boolean
        $bio: Boolean
        $username: Boolean
    ) {
        users(
            id: $id
            firstName: $firstName
            lastName: $lastName
            university: $university
            course: $course
            birthday: $birthday
            bio: $bio
            username: $username
        ) {
            id
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

export const useGetUserByID = (
    options: SelectUserByIDParameters
): graphQLHookReturnQuery => {
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    const { data, loading } = useQuery<
        UserObjectWithID,
        SelectUserByIDParameters
    >(UserByIDQuery, {
        onError: err => {
            setError(err)
            setSuccess(false)
        },
        onCompleted: () => {
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
