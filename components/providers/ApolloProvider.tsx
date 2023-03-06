'use client'

import { FC } from 'react'
import { ApolloProvider as Provider } from '@apollo/client'
import { ChildrenProps } from '../../types'
import { initiateApollo } from '../../lib/apollo'

export const ApolloProvider: FC<ChildrenProps> = ({ children }) => {
    const client = initiateApollo()

    return <Provider client={client}>{children}</Provider>
}
