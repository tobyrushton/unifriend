'use client'

import { FC } from 'react'
import { ApolloProvider } from '@apollo/client'
import { ChildrenProps } from '../types'
import apolloClient from '../lib/apollo'
import {
    LoadingProvider,
    NotificationProvider,
    UserProvider,
    ThemeProvider,
} from '../components'
import '../styles/globals.scss'
import '@fontsource/orbitron'

const RootLayout: FC<ChildrenProps> = ({ children }) => {
    return (
        <html lang="en-gb" data-theme="light">
            <head />
            <body>
                <ApolloProvider client={apolloClient}>
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
