import { createContext, FC, useMemo, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
    userContextInterface,
    ChildrenProps,
    UserObjectWithID,
    emailQuery,
    getUserFromAuthQuery,
    Settings,
    UpdateSettingsArgs,
    UserObjectWithSettings,
} from '../../types'
import { UserByEmailQuery } from '../../graphql/queries'
import { useQuery } from '../../hooks/graphql/useQuery'
import { useAuthStatus } from '../../hooks/providers/useAuthStatus'
import { useLoadingScreen } from '../../hooks/providers/useLoadingScreen'
import { useNotifications } from '../../hooks/providers/useNotifications'

// creates context for the provider.
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
} // default user value, all empty fields

const defaultSettings: Settings = {
    universityPreference: 'OWN',
    darkMode: false,
}

export const UserProvider: FC<ChildrenProps> = ({ children }) => {
    // creates state to store the users details
    const [user, setUser] = useState<UserObjectWithID>(defaultUser)
    const [settings, setSettings] = useState<Settings>(defaultSettings)

    // all hooks used
    const {
        session,
        loading: sessionLoading,
        passwordResetRequest,
        resetPassword,
    } = useAuthStatus()
    const { loading: queryLoading, query } = useQuery()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // sets loading
        setLoading(queryLoading || sessionLoading)
    }, [queryLoading, sessionLoading, setLoading])

    useEffect(() => {
        // executes query to get the users details
        const run = async (): Promise<void> => {
            if (session?.user.email) {
                const { data, error } = await query<
                    getUserFromAuthQuery<UserObjectWithSettings, 'User'>,
                    emailQuery
                >({ query: UserByEmailQuery, email: session.user.email })

                if (data) {
                    const {
                        __typename,
                        settings: userSettings,
                        ...userDetails
                    } = data.getUserFromAuth
                    setUser(userDetails)
                    setSettings(userSettings)
                } else if (error)
                    createNotification({
                        type: 'error',
                        content: error.message,
                    })
            }
        }
        // if there is no session, redirects user to the landing page
        // and iof user is defined then resets to the default.
        if (session?.user === undefined) {
            if (pathname !== '/') router.push('/')
            if (user !== defaultUser) {
                setUser(defaultUser)
                setSettings(defaultSettings)
            }
        }
        // implement get user from auth hook here once created.
        if (session?.user) if (session.user.email && user === defaultUser) run()
    }, [session, pathname, router, user, createNotification, query])

    useEffect(() => {
        if (
            user !== defaultUser &&
            (pathname === '/' ||
                pathname?.toLowerCase() === '/resetpassword') &&
            !passwordResetRequest
        )
            // if authorised and not on pathname '/a' pushes the user to '/a'
            router.push('/a')
    }, [user, router, pathname, passwordResetRequest])

    useEffect(() => {
        // if user has created a password reset request, pushes them to the screen
        if (passwordResetRequest) router.push('/resetPassword')
    }, [passwordResetRequest, router, pathname])

    const updateSettings = useMemo(
        // memoised
        () => (args: UpdateSettingsArgs) => {
            // updates the stored settings
            setSettings(prevState => ({
                universityPreference:
                    args.universityPreference ?? prevState.universityPreference,
                darkMode: args.darkMode ?? prevState.darkMode,
            }))
        },
        []
    )

    // value that is passed down
    const providerValue: userContextInterface = useMemo(
        // memoised
        () => ({ user, resetPassword, settings, updateSettings }),
        [user, resetPassword, settings, updateSettings]
    )

    return (
        <UserContext.Provider value={providerValue}>
            {children}
        </UserContext.Provider>
    )
}
