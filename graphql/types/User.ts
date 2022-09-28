import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('firstName')
    t.string('lastName')
    t.string('university')
    t.string('course')
    t.int('age')
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.users.findMany()
      },
    })
  },
})

//creates new user
export const CreateUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: User,
      args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        age: nonNull(intArg()),
        university: nonNull(stringArg()),
        course: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {

        const newUser = {
          firstName: args.firstName,
          lastName: args.lastName,
          university: args.university,
          course: args.course,
          age: args.age,
        }

        return await ctx.prisma.users.create({
          data: newUser,
        })
      },
    });
  },
});
