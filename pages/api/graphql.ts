import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { schema } from '../../graphql/schema'
import { resolvers } from '../../graphql/resolvers'
import { createContext } from '../../graphql/context'

const cors = Cors()

// creates a new apolloServer
const apolloServer = new ApolloServer({
    schema,
    resolvers,
    context: createContext,
})

const startServer = apolloServer.start() // starts the server

export default cors(async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }
    await startServer

    return apolloServer.createHandler({
        path: '/api/graphql', // creates new server with endpoint /api/graphql
    })(req, res)
})

export const config = {
    api: {
        bodyParser: false,
    },
}
