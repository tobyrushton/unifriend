import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

export const initiateApollo = (): ApolloClient<object> => {
    return new ApolloClient({
        link: createHttpLink({
            uri:
                process.env.NODE_ENV === 'production'
                    ? 'https://famous-bombolone-2a6fd0.netlify.app/api/graphql'
                    : 'http://localhost:3000/api/graphql',
        }),
        cache: new InMemoryCache(),
        ssrMode: typeof window === 'undefined',
    })
}
