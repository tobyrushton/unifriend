import { UserObject, UserObjectWithID, graphQLHookReturn } from '../../types/index'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

const CreateUserMutation = gql`
    mutation($firstName: String!, $lastName: String!, $birthday: String!, $university: String!, $course: String!) {
        createUser(firstName: $firstName, lastName: $lastName, birthday: $birthday, university: $university, course: $course) {
            firstName
            lastName
            course
            university
            birthday
        }
    }
`

const useCreateUser = (user:UserObject):graphQLHookReturn => {
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<Error>(new Error())
    const [ success, setSuccess ] = useState<boolean>(false) //defaults to false, for a false success to be viewed loading must also equal false.
    if(user.birthday.length !== 8)
        return {
            success: false,
            error: new Error('birthday invalid format'),
            loading: false
        } as graphQLHookReturn
    
    const [createUser, { loading: mutationLoading, error: mutationError }] = useMutation<UserObjectWithID, UserObject>(CreateUserMutation)
    setLoading(mutationLoading)
    
    try{
        createUser({ variables: user })
        setSuccess(true)
        setLoading(false)
    }
    catch(err){
        setError(err as Error)
        setLoading(false)
        setSuccess(false)
    }

    return {
        success: false,
        loading: false,
        error: new Error()
    } 
}

export default useCreateUser