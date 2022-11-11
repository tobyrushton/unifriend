import { createContext, FC, useMemo, useEffect, useState } from 'react'
import {
    userContextInterface,
    ChildrenProps,
    UserObjectWithID,
} from '../../types'
import { useAuthStatus, useGetUserByEmail } from '../../hooks'

// start second iteration with this file
// define a provider that will spread user information throughout the program
// check for auth session and if not logged in, put user to the login/signup page

export const UserContext = createContext<userContextInterface | null>(null)

const UserProvider: FC<ChildrenProps> = ({ children }) => {
    const [user, setUser] = useState<UserObjectWithID>({
        id: '',
        firstName: '',
        lastName: '',
        birthday: '',
        course: '',
        university: '',
        username: '',
        bio: '',
        email: '',
    })
    const [loading, setLoading] = useState<boolean>(false)
    const { session, loading: sessionLoading } = useAuthStatus()
    const { error, loading: queryLoading, runQuery, data } = useGetUserByEmail()

    useEffect(() => {
        setLoading(sessionLoading)
    }, [sessionLoading])

    useEffect(() => {
        setLoading(queryLoading)
    }, [queryLoading])

    useEffect(() => {
        // implement get user from auth hook here once created.
        if (session?.user) if (session.user.email) runQuery(session.user.email)
    }, [session])

    useEffect(() => {
        if (data) setUser(data)
    }, [data])

    const providerValue: userContextInterface = useMemo(
        () => ({ user }),
        [user]
    )

    return (
        <UserContext.Provider value={providerValue}>
            {loading ? 'screen' : 'nothing'}
            {error ? 'screen' : 'nothing'}
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
