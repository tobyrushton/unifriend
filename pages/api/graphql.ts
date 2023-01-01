import Cors from 'micro-cors'
import { createYoga } from 'graphql-yoga'
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

    console.log('running server')

    // returns the graphql-yoga server.
    return createYoga({
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
