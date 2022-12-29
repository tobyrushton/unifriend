import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    // split,
} from '@apollo/client'
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
// import { getMainDefinition } from '@apollo/client/utilities'
// import { createClient } from 'graphql-ws'

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? 'https://famous-bombolone-2a6fd0.netlify.app/api/graphql'
            : 'http://localhost:3000/api/graphql',
})

// const wsLink = new GraphQLWsLink(
//     createClient({ url: 'ws://localhost:3000/api/graphql' })
// )

// const splitLink = split(
//     ({ query }) => {
//         const definition = getMainDefinition(query)
//         return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//         )
//     },
//     wsLink,
//     httpLink
// )

export const initiateApollo = (): ApolloClient<object> => {
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
        ssrMode: typeof window === 'undefined',
    })
}
