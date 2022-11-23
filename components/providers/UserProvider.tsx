import { createContext, FC, useMemo, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
    userContextInterface,
    ChildrenProps,
    UserObjectWithID,
} from '../../types'
import { useGetUserByEmail } from '../../hooks/graphql/User/useGetUserByEmail'
import { useAuthStatus } from '../../hooks/providers/useAuthStatus'
import { useLoadingScreen } from '../../hooks/providers/useLoadingScreen'
import { useNotifications } from '../../hooks/providers/useNotifications'

// start second iteration with this file
// define a provider that will spread user information throughout the program
// check for auth session and if not logged in, put user to the login/signup page

export const UserContext = createContext<userContextInterface | null>(null)

const defaultUser: UserObjectWithID = {
    id: '',
    firstName: '',
    lastName: '',
    birthday: '',
    course: '',
    university: '',
    username: '',
    bio: '',
    email: '',
}

export const UserProvider: FC<ChildrenProps> = ({ children }) => {
    const [user, setUser] = useState<UserObjectWithID>(defaultUser)
    const { session, loading: sessionLoading } = useAuthStatus()
    const { error, loading: queryLoading, runQuery, data } = useGetUserByEmail()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (queryLoading || sessionLoading) setLoading(true)
        else setLoading(false)
    }, [queryLoading, sessionLoading, setLoading])

    useEffect(() => {
        if (error)
            createNotification({
                type: 'error',
                content: error?.message as string,
            })
    }, [error, createNotification])

    useEffect(() => {
        // implement get user from auth hook here once created.
        if (session?.user) if (session.user.email) runQuery(session.user.email)
    }, [session, runQuery])

    useEffect(() => {
        if (data) setUser(data)
    }, [data])

    useEffect(() => {
        if (user !== defaultUser && pathname === '/') router.push('/home')
    }, [user, router, pathname])

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
