import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? 'https://famous-bombolone-2a6fd0.netlify.app/api/graphql'
            : 'http://localhost:3000/api/graphql',
})

export const initiateApollo = (): ApolloClient<object> => {
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
        ssrMode: typeof window === 'undefined',
    })
}
