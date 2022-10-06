import { graphQLHookReturn, UserObjectWithID, SelectUserByIDParameters } from '../../types'
import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const UserByIDQuery = gql`
    query Users($usersId: String!, $firstNameSelected: Boolean, $lastNameSelected: Boolean, $universitySelected: Boolean, $courseSelected: Boolean, $birthdaySelected: Boolean) {
        users(id: $usersId, firstNameSelected: $firstNameSelected, lastNameSelected: $lastNameSelected, universitySelected: $universitySelected, courseSelected: $courseSelected, birthdaySelected: $birthdaySelected) {
            id
            firstName
            lastName
            university
            course
            birthday
        }
    }
`

const useGetUserByID = (options: SelectUserByIDParameters): graphQLHookReturn => {
    const [ error, setError ] = useState<Error>()
    const [ success, setSuccess ] = useState<boolean>(false) //defaults to false, for a false success to be viewed loading must also equal false.

    const {loading, data, error: queryError} = useQuery<UserObjectWithID, SelectUserByIDParameters>(UserByIDQuery, {variables: options})

    useEffect(()=> {
        if(data)
            setSuccess(true)
    }, [data])

    useEffect(()=> {
        if(queryError)
            setError(queryError)
    }, [queryError])

    return {
        loading,
        error,
        success
    }
}

export default useGetUserByID