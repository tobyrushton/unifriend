import { ApolloServer } from '@apollo/server'
// import Cors from 'micro-cors'
// import { createServer } from 'http'
// import { WebSocketServer } from 'ws'
// import { useServer } from 'graphql-ws/lib/use/ws'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
// import { NextApiRequest, NextApiResponse } from 'next'
import { schema } from '../../graphql/schema'
// import { resolvers } from '../../graphql/resolvers'
import { createContext } from '../../graphql/context'

// const cors = Cors()

// create http server to handle subscriptions
// const httpServer = createServer()

// creates websocket server
// const wsServer = new WebSocketServer({
//     server: httpServer,
//     path: '/api/graphql',
// })

// Save the returned server's info so we can shutdown this server later
/* eslint-disable-next-line */
// const serverCleanup = useServer({ schema }, wsServer)

// creates a new apolloServer
const apolloServer = new ApolloServer({
    schema,
    // plugins: [
    //     {
    //         async serverWillStart() {
    //             return {
    //                 async drainServer() {
    //                     await serverCleanup.dispose()
    //                 },
    //             }
    //         },
    //     },
    // ],
})

// const startServer = apolloServer.start() // starts the server

// export default cors(async (req, res) => {
//     if (req.method === 'OPTIONS') {
//         res.end()
//         return false
//     }
//     // await startServer

//     //creates instance and handle for the server.
//     const serverFunc = startServerAndCreateNextHandler(apolloServer, {
//         context: () => createContext(),
//     })

//     return serverFunc(req as NextApiRequest, res as NextApiResponse)
// })

export default startServerAndCreateNextHandler(apolloServer, {
    context: createContext,
})

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }
