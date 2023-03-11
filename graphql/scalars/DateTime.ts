import { scalarType } from 'nexus'

// creates DateTime type
export const DateTime = scalarType({
    name: 'DateTime',
    asNexusMethod: 'dateTime',
    description: 'DateTime custom scalar type.',
    parseValue: value => value,
    serialize: value => value,
    parseLiteral: ast => ast,
})
