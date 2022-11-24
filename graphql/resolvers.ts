export const resolvers = {
    Query: {
        /* eslint-disable-next-line */
        users: (_parent: any, _args: any, context: any) => {
            return context.prisma.users.findMany()
        },
    },
}
