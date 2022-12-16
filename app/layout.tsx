import { FC } from 'react'
import { cookies } from 'next/headers'
import { ChildrenProps, Theme } from '../types'
import {
    LoadingProvider,
    NotificationProvider,
    UserProvider,
    ThemeProvider,
    ApolloProvider,
} from '../components'
import '../styles/globals.scss'

const getTheme = (): Theme => {
    const nextCookies = cookies()

    return (nextCookies.get('theme')?.value ?? 'light') as Theme
}

const RootLayout: FC<ChildrenProps> = ({ children }) => {
    const theme = getTheme()

    return (
        <html lang="en-gb" data-theme={theme}>
            <head />
            <body>
                <ApolloProvider>
                    <LoadingProvider>
                        <NotificationProvider>
                            <UserProvider>
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
