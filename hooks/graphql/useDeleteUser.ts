import { graphQLHookReturn, UserObjectWithID } from '../../types'
import { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'

const DeleteUserMutation = gql`
    mutation Mutation($userID: String!) {
        deleteUser(id: $userID) {
            id
        }
    }
`

export const useDeleteUser = (userID:string):graphQLHookReturn => {
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<Error>()
    const [ success, setSuccess ] = useState<boolean>(false) //defaults to false, for a false success to be viewed loading must also equal false.


    const [deleteUser] = useMutation<UserObjectWithID, {userID: string}>(DeleteUserMutation, 
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
            deleteUser({ variables: {userID: userID} })
    }, [])

    return {
        loading,
        error,
        success
    }
}