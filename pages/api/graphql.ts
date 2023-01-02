import Cors from 'micro-cors'
import { createYoga } from 'graphql-yoga'
import { NextApiRequest, NextApiResponse } from 'next'
import { schema } from '../../graphql/schema'
import { createContext } from '../../graphql/context'

// creates instance of cors
const cors = Cors()

// exports api endpoint
export default cors(async (req, res) => {
    // if req methods options, ends the connection
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }

    // returns the graphql-yoga server.
    return createYoga<{
        req: NextApiRequest
        res: NextApiResponse
    }>({
        graphqlEndpoint: '/api/graphql',
        schema,
        context: createContext,
    })(req, res)
})

export const config = {
    api: {
        bodyParser: false,
    },
}
