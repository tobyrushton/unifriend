import { scalarType } from 'nexus'
import { Kind } from 'graphql'

// creates DateTime type
export const DateTime = scalarType({
    name: 'DateTime',
    asNexusMethod: 'dateTime',
    description: 'DateTime custom scalar type.',
    parseValue: value => value,
    serialize: value => new Date((value as number) * 1000).toISOString(), // creates ISO string
    parseLiteral: ast =>
        ast.kind === Kind.INT
            ? new Date(parseInt(ast.value, 10) * 1000).toISOString() // creates ISO string
            : null,
})
