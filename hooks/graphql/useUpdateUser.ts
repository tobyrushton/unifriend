import { graphQLHookReturn, UpdateUserParamaters, UserObject, UserObjectWithID } from "../../types";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const UpdateUserMutation = gql`
    mutation UpdateUser($userID: String!, $university: String, $firstName: String, $lastName: String, $birthday: String, $course: String,) {
        updateUser(id: $userID, university: $university, firstName: $firstName, lastName: $lastName, birthday: $birthday, course: $course) {
        university
        firstName
        lastName
        course
        birthday
        }
    }
`

const useUpdateUser = (updates:UpdateUserParamaters):graphQLHookReturn => {    
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<Error>(new Error())
    const [ success, setSuccess ] = useState<boolean>(false) //defaults to false, for a false success to be viewed loading must also equal false.

    const [updateUser, { loading: mutationLoading, error: mutationError }] = useMutation<UserObjectWithID, UpdateUserParamaters>(UpdateUserMutation)
    setLoading(mutationLoading)

    try{
        updateUser({ variables: updates })
        setSuccess(true)
        setLoading(false)
    }catch(e){
        setError(e as Error)
        setLoading(false)
        setSuccess(false)
    }



    return {
        loading,
        error,
        success
    }
}
