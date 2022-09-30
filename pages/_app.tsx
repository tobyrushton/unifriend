import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import apolloClient from '../lib/apollo'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp
