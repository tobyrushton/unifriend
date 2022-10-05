import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { UserObject, UserObjectWithID } from '../../types/User'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('firstName')
    t.string('lastName')
    t.string('university')
    t.string('course')
    t.string('birthday')
  },
})

//fetches user by ID
export const UserQueryByID = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.string('id')
    t.string('firstName')
    t.string('lastName')
    t.string('university')
    t.string('course')
    t.string('birthday')
    t.nullable.field('users', {
      type: 'User',
      args: {id: nonNull(stringArg())},
      resolve(_parent, args, ctx) {
        return ctx.prisma.users.findMany({
          where: {
            id: args.id
          }
        })
      }
    })
  },
})

//fetches all users
export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('user', {
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
        birthday: nonNull(stringArg()),
        university: nonNull(stringArg()),
        course: nonNull(stringArg()),
      },
      async resolve(_parent, args: UserObject, ctx) {

        if(!args.firstName || !args.lastName || !args.birthday || !args.university || !args.course)
          throw new Error('Missing arguements on object user')
        
        const newUser = {
          firstName: args.firstName,
          lastName: args.lastName,
          university: args.university,
          course: args.course,
          birthday: args.birthday,
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
    t.nonNull.field('updateUser', {
      type: User,
      args: {
        id: nonNull(stringArg()),
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        birthday: nonNull(stringArg()),
        university: nonNull(stringArg()),
        course: nonNull(stringArg()),
      },
      async resolve(_parent, args: UserObjectWithID, ctx) {
        return ctx.prisma.users.update({
          where: { id: args.id },
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            course: args.course,
            university: args.university,
            birthday: args.birthday
          }
        })
      },
    })
  },
})

//delete user
export const DeleteUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteUser', {
      type: 'User',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.users.delete({
          where: { id: args.id },
        });
      },
    });
  },
});
