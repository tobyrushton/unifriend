import { objectType, extendType, nonNull, stringArg, intArg, idArg } from 'nexus'
import { UserObject, UserObjectWithID } from '../../types/User'

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
      async resolve(_parent, args: UserObject, ctx) {

        if(!args.firstName || !args.lastName || !args.age || !args.university || !args.course)
          return new Error('Missing arguements on object user')
        
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
    })
  },
})


//updates properties on user
export const UpdateUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: User,
      args: {
        id: nonNull(stringArg()),
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        age: nonNull(intArg()),
        university: nonNull(stringArg()),
        course: nonNull(stringArg()),
      },
      async resolve(_parent, args: UserObjectWithID, ctx) {
        return ctx.prisma.link.update({
          where: { id: args.id },
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            course: args.course,
            university: args.university,
            age: args.age
          }
        })
      },
    })
  },
})
