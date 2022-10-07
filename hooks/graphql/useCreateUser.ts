import { UserObject, UserObjectWithID, graphQLHookReturn } from '../../types/index'
import { gql, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'

const CreateUserMutation = gql`
    mutation Mutation($firstName: String!, $lastName: String!, $birthday: String!, $university: String!, $course: String!, $username: String!) {
        createUser(firstName: $firstName, lastName: $lastName, birthday: $birthday, university: $university, course: $course, username: $username) {
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

export const useCreateUser = (user:UserObject):graphQLHookReturn => {
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<Error>()
    const [ success, setSuccess ] = useState<boolean>(false) //defaults to false, for a false success to be viewed loading must also equal false.
    if(user.birthday.length !== 8)
        return {
            success: false,
            error: new Error('birthday invalid format'),
            loading: false
        } as graphQLHookReturn

    const [createUser] = useMutation<UserObjectWithID, UserObject>(CreateUserMutation, 
        { 
            onError: (error) =>{
                setError(error)
                setSuccess(false)
                setLoading(false)
            },
            onCompleted: () => {
                setSuccess(true)
                setLoading(false)
            }
        })
    
    useEffect(()=> {
            createUser({ variables: user })
    }, [])

    return {
        success,
        loading,
        error
    } as const
}