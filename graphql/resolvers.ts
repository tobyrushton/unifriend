export const resolvers = {
    Query: {
        users: (_parent:any, _args:any, context:any) => {
            return context.prisma.link.findMany()
          },
    }
}