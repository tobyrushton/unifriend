import { objectType, extendType, nonNull, stringArg, booleanArg } from 'nexus'
import { tempUserObject, UserUpdateObject } from '../../types'
import { Friend, FriendRequest } from './Friends'
import { Settings } from './Settings'
import { Message } from './Messages'

// types User that's defined within the graphQL api.
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
            type: Friend, // type friend from './Friends.ts'
        })
        t.list.field('friendRequests', {
            type: FriendRequest, // type friendRequest from './Friends.ts'
        })
        t.string('bio')
        t.list.field('sentMessages', {
            type: Message, // type message from './Message.ts'
        })
        t.list.field('recievedMessages', {
            type: Message, // type message from './Message.ts'
        })
        t.field('settings', {
            type: Settings, // type settings from './Settings.ts'
        })
        t.string('email')
    },
})

// fetches user by ID
export const UserQueryByID = extendType({
    type: 'Query', // query refers to returning data from the database
    definition(t) {
        t.nullable.field('users', {
            type: 'User', // uses type user defined earlier.
            args: {
                // all arguements that can be taken by the Query.
                id: nonNull(stringArg()),
                firstName: booleanArg(),
                lastName: booleanArg(),
                university: booleanArg(),
                course: booleanArg(),
                birthday: booleanArg(),
                bio: booleanArg(),
                username: booleanArg(),
                email: booleanArg(),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.users.findUnique({
                    where: {
                        // finds the unique user row in the databse with corresponding id
                        id: args.id,
                    },
                    select: {
                        // selects which columns from that databse to return
                        firstName: args.firstName ?? false,
                        lastName: args.lastName ?? false,
                        university: args.university ?? false,
                        birthday: args.birthday ?? false,
                        course: args.course ?? false,
                        bio: args.bio ?? false,
                        username: args.username ?? false,
                        email: args.email ?? false,
                    },
                })
            },
        })
    },
})

// fetches all users
export const UserQuery = extendType({
    type: 'Query', // uses type user defined earlier.
    definition(t) {
        t.nonNull.list.field('user', {
            type: 'User',
            resolve(_parent, _args, ctx) {
                // returns all rows in the user table
                return ctx.prisma.users.findMany()
            },
        })
    },
})

// creates new user
export const CreateUserMutation = extendType({
    type: 'Mutation', // modifying data in the database
    definition(t) {
        t.nonNull.field('createUser', {
            type: User, // uses type user defined earlier.
            args: {
                // all arguements required to create a new user row in the database
                firstName: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                birthday: nonNull(stringArg()),
                university: nonNull(stringArg()),
                course: nonNull(stringArg()),
                username: nonNull(stringArg()),
                email: nonNull(stringArg()),
            },
            async resolve(_parent, args, ctx) {
                const newUser = {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    university: args.university,
                    course: args.course,
                    birthday: args.birthday,
                    username: args.username,
                    email: args.email,
                    bio: '',
                }

                return ctx.prisma.users.create({
                    data: newUser, // creates new row in users table.
                })
            },
        })
    },
})

// updates properties on user
export const UpdateUserMutation = extendType({
    type: 'Mutation', // modifies data in the database
    definition(t) {
        t.nonNull.field('updateUser', {
            type: User, // uses type user defined earlier.
            args: {
                // all arguements required to update the user.
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
                const temp: tempUserObject = { ...args } as tempUserObject
                delete temp.id // removes id property so that it is not passed in the updates.
                const userUpdates: UserUpdateObject = temp

                return ctx.prisma.users.update({
                    // updates the row corresponding to the id passed as an arguement.
                    where: { id: args.id },
                    data: userUpdates,
                })
            },
        })
    },
})

// delete user
export const DeleteUserMutation = extendType({
    type: 'Mutation', // modifies data in the database
    definition(t) {
        t.nonNull.field('deleteUser', {
            type: 'User', // uses type user defined earlier.
            args: {
                // takes only the user id as a parameter
                id: nonNull(stringArg()),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.users.delete({
                    where: { id: args.id }, // deletes row in the database.
                })
            },
        })
    },
})

// gets user info from email.
export const GetUserFromAuth = extendType({
    type: 'Query', // returns data from the database.
    definition(t) {
        t.nonNull.field('getUserFromAuth', {
            type: 'User', // uses type user defined earlier.
            args: {
                // takes the users email as an arguement
                email: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.users.findUnique({
                    where: {
                        email: args.email,
                    },
                })
            },
        })
    },
})

// gets users Auth information from their username.
export const GetAuthFromUsername = extendType({
    type: 'Query', // returns data from the database.
    definition(t) {
        t.nonNull.field('getAuthFromUsername', {
            type: 'User', // uses type user defined earlier.
            args: {
                // takes users username as an arguement
                username: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.users.findUnique({
                    where: {
                        // finds unique row in table users where the username matches
                        username: args.username,
                    },
                    select: {
                        // returns only the email
                        email: true,
                    },
                })
            },
        })
    },
})
