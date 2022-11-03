import { createContext, FC, useMemo, useEffect, useState } from 'react'
import { userContextInterface, children, UserObjectWithID } from '../../types'
import { useAuthStatus, useGetUserByID } from '../../hooks'

// start second iteration with this file
// define a provider that will spread user information throughout the program
// check for auth session and if not logged in, put user to the login/signup page

export const UserContext = createContext<userContextInterface | null>(null)

const UserProvider: FC<children> = ({ children }) => {
    const [user, setUser] = useState<UserObjectWithID | null>(null)
    const { session, loading: sessionLoading } = useAuthStatus()

    useEffect(() => {
        //implement get user from auth hook here once created.
    }, [session])

    const providerValue: userContextInterface = useMemo(
        () => ({ user }),
        [user]
    )

    return (
        <UserContext.Provider value={providerValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
