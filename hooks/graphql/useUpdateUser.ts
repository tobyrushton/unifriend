import { graphQLHookReturn, UpdateUserParamaters, UserObjectWithID } from "../../types";
import { gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const UpdateUserMutation = gql`
    mutation UpdateUser($userId: String!, $firstName: String, $lastName: String, $birthday: String, $university: String, $course: String, $username: String, $bio: String) {
        updateUser(id: $userId, firstName: $firstName, lastName: $lastName, birthday: $birthday, university: $university, course: $course, username: $username, bio: $bio) {
            userId
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

export const useUpdateUser = (updates:UpdateUserParamaters):graphQLHookReturn => {    
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<Error>()
    const [ success, setSuccess ] = useState<boolean>(false) //defaults to false, for a false success to be viewed loading must also equal false.

    const [updateUser] = useMutation<UserObjectWithID, UpdateUserParamaters>(UpdateUserMutation, 
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
            updateUser({ variables: updates })
    }, [])



    return {
        loading,
        error,
        success
    }
}
