import { GraphQLFormattedError } from 'graphql'

export type Response<TData = object> = {
    body: {
        singleResult: {
            data: TData
            errors: GraphQLFormattedError[] | undefined
        }
    }
}
