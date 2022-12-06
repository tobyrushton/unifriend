import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
    uri:
        process.env.NODE_ENV === 'production'
            ? 'https://famous-bombolone-2a6fd0.netlify.app/api/graphql'
            : 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
})

export default apolloClient
