import {
    ApolloLink,
    Operation,
    FetchResult,
    Observable,
    ApolloClient,
    InMemoryCache,
} from '@apollo/client/core'
import { split } from '@apollo/client/link/core'
import { HttpLink } from '@apollo/client/link/http'
import { print, getOperationAST } from 'graphql'
import { onError } from '@apollo/client/link/error'

/* eslint-disable-next-line */
type SSELinkOptions = EventSourceInit & { uri: string }

class SSELink extends ApolloLink {
    constructor(private options: SSELinkOptions) {
        super()
    }

    request(operation: Operation): Observable<FetchResult> {
        const url = new URL(this.options.uri)
        url.searchParams.append('query', print(operation.query))
        if (operation.operationName) {
            url.searchParams.append('operationName', operation.operationName)
        }
        if (operation.variables) {
            url.searchParams.append(
                'variables',
                JSON.stringify(operation.variables)
            )
        }
        if (operation.extensions) {
            url.searchParams.append(
                'extensions',
                JSON.stringify(operation.extensions)
            )
        }

        return new Observable(sink => {
            const eventsource = new EventSource(url.toString(), this.options)
            eventsource.onmessage = function (event) {
                const data = JSON.parse(event.data)
                sink.next(data)
                if (eventsource.readyState === 2) {
                    sink.complete()
                }
            }
            eventsource.onerror = function (error) {
                sink.error(error)
            }
            return () => eventsource.close()
        })
    }
}

// site url
const uri =
    process.env.NODE_ENV === 'production'
        ? 'https://famous-bombolone-2a6fd0.netlify.app/api/graphql'
        : 'http://localhost:3000/api/graphql'

// server side events url for subscriptions
const sseLink = new SSELink({ uri })
// http link for queries and mutations
const httpLink = new HttpLink({ uri })

// split between sse and http links
const link = split(
    ({ query, operationName }) => {
        const definition = getOperationAST(query, operationName)

        return (
            definition?.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    sseLink,
    httpLink
)

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

// initiate apollo client
export const initiateApollo = (): ApolloClient<object> => {
    return new ApolloClient({
        link:
            process.env.NODE_ENV === 'development'
                ? ApolloLink.from([errorLink, link])
                : link,
        cache: new InMemoryCache(),
        ssrMode: typeof window === 'undefined',
    })
}
