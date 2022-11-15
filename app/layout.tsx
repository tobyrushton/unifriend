'use client'

import { FC, ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { ChildrenProps } from '../types'
import apolloClient from '../lib/apollo'
import { LoadingProvider } from '../components'

const RootLayout: FC<ChildrenProps> = ({
    children,
}: {
    children: ReactNode
}) => {
    return (
        <html lang="en">
            <head />
            <body>
                <ApolloProvider client={apolloClient}>
                    <LoadingProvider>{children}</LoadingProvider>
                </ApolloProvider>
            </body>
        </html>
    )
}

export default RootLayout
