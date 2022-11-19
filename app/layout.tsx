'use client'

import { FC } from 'react'
import { ApolloProvider } from '@apollo/client'
import { ChildrenProps } from '../types'
import apolloClient from '../lib/apollo'
import { LoadingProvider, NotificationProvider } from '../components'
import '../styles/globals.scss'

const RootLayout: FC<ChildrenProps> = ({ children }) => {
    return (
        <html lang="en">
            <head />
            <body>
                <ApolloProvider client={apolloClient}>
                    <LoadingProvider>
                        <NotificationProvider>{children}</NotificationProvider>
                    </LoadingProvider>
                </ApolloProvider>
            </body>
        </html>
    )
}

export default RootLayout
