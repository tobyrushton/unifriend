import { graphQLHookReturn, UserObjectWithID } from '../../types'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const DeleteUserMutation = gql`
    mutation Mutation($userID: String!) {
        deleteUser(id: $userID) {
            id
        }
    }
`

const useDeleteUser = (userID:string):graphQLHookReturn => {
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<Error>()
    const [ success, setSuccess ] = useState<boolean>(false) //defaults to false, for a false success to be viewed loading must also equal false.

    const [deleteUser, { loading: mutationLoading, error: mutationError }] = useMutation<UserObjectWithID, {userID: string}>(DeleteUserMutation)
    setLoading(mutationLoading)

    try{
        deleteUser({ variables: {userID: userID} })
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

