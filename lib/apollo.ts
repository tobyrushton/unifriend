import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
    uri: 'https://famous-bombolone-2a6fd0.netlify.app/api/graphql',
    cache: new InMemoryCache(),
})

export default apolloClient
