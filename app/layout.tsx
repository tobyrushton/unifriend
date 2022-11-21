'use client'

import { FC } from 'react'
import { ApolloProvider } from '@apollo/client'
import { ChildrenProps } from '../types'
import apolloClient from '../lib/apollo'
import {
    LoadingProvider,
    NotificationProvider,
    UserProvider,
} from '../components'
import '../styles/globals.scss'

const RootLayout: FC<ChildrenProps> = ({ children }) => {
    return (
        <html lang="en">
            <head />
            <body>
                <ApolloProvider client={apolloClient}>
                    <LoadingProvider>
                        <NotificationProvider>
                            <UserProvider>{children}</UserProvider>
                        </NotificationProvider>
                    </LoadingProvider>
                </ApolloProvider>
            </body>
        </html>
    )
}

export default RootLayout
