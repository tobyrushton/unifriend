import 'server-only'

import { ReactElement } from 'react'
import { cookies } from 'next/headers'
import {
    ChildrenProps,
    Theme,
    UserObjectWithSettings,
    GetSessionReturn,
    EmailQuery,
    QueryReturn,
    QueryReturnInterface,
    Join,
    Settings,
} from '../types'
import {
    LoadingProvider,
    NotificationProvider,
    UserProvider,
    ThemeProvider,
    ApolloProvider,
} from '../components'
import { SupabaseListener } from '../components/supabase-listener'
import { getServerSideSupabase } from '../lib/supabase'
import { initiateApollo } from '../lib/apollo'
import { GET_USER_BY_EMAIL } from '../graphql/queries'
import '../styles/globals.scss'

export const revalidate = 0

const getTheme = (): Theme => {
    const nextCookies = cookies()

    return (nextCookies.get('theme')?.value ?? 'light') as Theme
}

const getSession = async (): Promise<GetSessionReturn | null> => {
    const supabase = getServerSideSupabase()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session === null) return null

    const apollo = initiateApollo()

    const { data } = await apollo.query<
        QueryReturn<
            Join<
                UserObjectWithSettings,
                { settings: QueryReturnInterface<Settings, 'Settings'> }
            >,
            'User',
            'getUserFromAuth'
        >,
        EmailQuery
    >({
        query: GET_USER_BY_EMAIL,
        variables: {
            email: session.user.email as string,
        },
    })

    const {
        __typename,
        settings: { __typename: __, ...settings },
        ...user
    } = data.getUserFromAuth

    return {
        session,
        user,
        settings,
    }
}

const RootLayout = async ({
    children,
}: ChildrenProps): Promise<ReactElement> => {
    const theme = getTheme()

    const session = await getSession()

    return (
        <html lang="en-gb" data-theme={theme}>
            <head />
            <body>
                <SupabaseListener
                    accessToken={session?.session?.access_token}
                />
                <ApolloProvider>
                    <LoadingProvider>
                        <NotificationProvider>
                            <UserProvider
                                fetchedUser={session?.user}
                                fetchedSettings={session?.settings}
                            >
                                <ThemeProvider>{children}</ThemeProvider>
                            </UserProvider>
                        </NotificationProvider>
                    </LoadingProvider>
                </ApolloProvider>
            </body>
        </html>
    )
}

export default RootLayout
