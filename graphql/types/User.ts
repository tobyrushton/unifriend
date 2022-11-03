import { objectType, extendType, nonNull, stringArg, booleanArg } from 'nexus'
import { UserUpdateObject } from '../../types'
import { Friend, FriendRequest } from './Friends'
import { Settings } from './Settings'
import { Message } from './Messages'

export const User = objectType({
    name: 'User',
    definition(t) {
        t.string('id')
        t.string('firstName')
        t.string('lastName')
        t.string('university')
        t.string('course')
        t.string('birthday')
        t.string('username')
        t.list.field('friends', {
            type: Friend,
        })
        t.list.field('friendRequests', {
            type: FriendRequest,
        })
        t.string('bio')
        t.list.field('sentMessages', {
            type: Message
        })
        t.list.field('recievedMessages', {
            type: Message
        })
        t.field('settings', {
            type: Settings
        })
    },
})

// fetches user by ID
export const UserQueryByID = extendType({
    type: 'Query',
    definition(t) {
        t.nullable.field('users', {
            type: 'User',
            args: {
                id: nonNull(stringArg()),
                firstName: booleanArg(),
                lastName: booleanArg(),
                university: booleanArg(),
                course: booleanArg(),
                birthday: booleanArg(),
                bio: booleanArg(),
                username: booleanArg(),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.users.findUnique({
                    where: {
                        id: args.id,
                    },
                    select: {
                        firstName: args.firstName ?? false,
                        lastName: args.lastName ?? false,
                        university: args.university ?? false,
                        birthday: args.birthday ?? false,
                        course: args.course ?? false,
                        bio: args.bio ?? false,
                        username: args.username ?? false,
                    },
                })
            },
        })
    },
})

// fetches all users
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

// creates new user
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
                username: nonNull(stringArg()),
            },
            async resolve(_parent, args, ctx) {
                if (
                    !args.firstName ||
                    !args.lastName ||
                    !args.birthday ||
                    !args.university ||
                    !args.course ||
                    !args.username
                )
                    throw new Error('Missing arguements on object user')

                const newUser = {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    university: args.university,
                    course: args.course,
                    birthday: args.birthday,
                    username: args.username,
                    bio: '',
                }

                return ctx.prisma.users.create({
                    data: newUser,
                })
            },
        })
    },
})

// updates properties on user
export const UpdateUserMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('updateUser', {
            type: User,
            args: {
                id: nonNull(stringArg()),
                firstName: stringArg(),
                lastName: stringArg(),
                birthday: stringArg(),
                university: stringArg(),
                course: stringArg(),
                username: stringArg(),
                bio: stringArg(),
            },
            resolve: (_parent, args, ctx) => {
                const temp = { ...args }
                delete temp.id // removes id property so that it is not passed in the updates.
                const userUpdates: UserUpdateObject = temp

                return ctx.prisma.users.update({
                    where: { id: args.id },
                    data: userUpdates,
                })
            },
        })
    },
})

// delete user
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
                })
            },
        })
    },
})

export const GetUserFromAuth = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('getUserFromAuth', {
            type: 'User',
            args: {
                email: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.auth.findUnique({
                    where: { email: args.email },
                    include: { User: true },
                })
            },
        })
    },
})

export const ConnectUserToAuth = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('connectUserToAuth', {
            type: 'User',
            args: {
                authID: nonNull(stringArg()),
                userID: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.auth.update({
                    where: {
                        id: args.authID,
                    },
                    data: {
                        User: {
                            connect: {
                                id: args.userID,
                            },
                        },
                    },
                })
            },
        })
    },
})

export const GetAuthFromUsername = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('getAuthFromUsername', {
            type: 'User',
            args: {
                username: nonNull(stringArg())
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.auth.findUnique({
                    where: {
                        User: {
                            username: args.username
                        }
                    }
                })
            }
        })
    },
})
