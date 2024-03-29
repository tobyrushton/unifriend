import {
    objectType,
    extendType,
    nonNull,
    stringArg,
    booleanArg,
    intArg,
} from 'nexus'
import {
    EmailQuery,
    TempUserObject,
    UserObjectWithSettings,
    UserUpdateObject,
    UserObjectWithSettingsAndFriends,
    FriendsWithID,
} from '../../types'
import { Friend, FriendRequest } from './Friends'
import { Settings } from './Settings'
import { Message } from './Messages'
import { isValidEmail, isValidUsername, randomPick } from '../../lib/utils'

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
        t.nonNull.field('users', {
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
                settings: booleanArg(),
                all: booleanArg(),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.users.findUnique({
                    where: {
                        // finds the unique user row in the databse with corresponding id
                        id: args.id,
                    },
                    select: args.all
                        ? undefined
                        : {
                              // selects which columns from that databse to return
                              firstName: args.firstName ?? false,
                              lastName: args.lastName ?? false,
                              university: args.university ?? false,
                              birthday: args.birthday ?? false,
                              course: args.course ?? false,
                              bio: args.bio ?? false,
                              username: args.username ?? false,
                              email: args.email ?? false,
                              settings: args.settings ?? false,
                          },
                }) as unknown as UserObjectWithSettings
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
            args: {
                id: nonNull(stringArg()),
                universityPreference: nonNull(stringArg()),
                university: nonNull(stringArg()),
                take: intArg(),
            },
            resolve: async (_parent, args, ctx) => {
                // allows for the users to be randomised
                const orderDirection = randomPick(['asc', 'desc'])
                const orderBy = randomPick([
                    'id',
                    'firstName',
                    'lastName',
                    'university',
                    'course',
                    'username',
                    'email',
                ])

                // returns 10 rows from the database
                return ctx.prisma.users.findMany({
                    take: args.take ?? 10,
                    orderBy: {
                        [orderBy]: orderDirection,
                    },
                    // filters the rows to only return rows that match the arguements
                    // returns if no friend relation or friend request relation exists
                    // and if the university matches the arguement if universityPreference is 'OWN'
                    // or if the university is not the same and the
                    // universityPreference is 'ALL' for both users
                    where: {
                        AND: [
                            {
                                id: {
                                    not: args.id,
                                },
                            },
                            {
                                OR: [
                                    {
                                        friends: {
                                            every: {
                                                AND: [
                                                    {
                                                        friendID: {
                                                            not: args.id,
                                                        },
                                                    },
                                                    {
                                                        usersId: {
                                                            not: args.id,
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        friends: {
                                            none: {},
                                        },
                                    },
                                ],
                            },
                            {
                                OR: [
                                    {
                                        Friends_Friends_friendIDToUsers: {
                                            every: {
                                                AND: [
                                                    {
                                                        friendID: {
                                                            not: args.id,
                                                        },
                                                    },
                                                    {
                                                        usersId: {
                                                            not: args.id,
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        Friends_Friends_friendIDToUsers: {
                                            none: {},
                                        },
                                    },
                                ],
                            },
                            {
                                OR: [
                                    {
                                        friendRequests: {
                                            every: {
                                                AND: [
                                                    {
                                                        friendID: {
                                                            not: args.id,
                                                        },
                                                    },
                                                    {
                                                        usersId: {
                                                            not: args.id,
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        friendRequests: {
                                            none: {},
                                        },
                                    },
                                ],
                            },
                            {
                                OR: [
                                    {
                                        FriendRequests_FriendRequests_friendIDToUsers:
                                            {
                                                every: {
                                                    AND: [
                                                        {
                                                            friendID: {
                                                                not: args.id,
                                                            },
                                                        },
                                                        {
                                                            usersId: {
                                                                not: args.id,
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                    },
                                    {
                                        FriendRequests_FriendRequests_friendIDToUsers:
                                            {
                                                none: {},
                                            },
                                    },
                                ],
                            },
                            args.universityPreference === 'ALL'
                                ? {
                                      settings: {
                                          universityPreference: {
                                              equals: 'ALL',
                                          },
                                      },
                                  }
                                : {
                                      university: args.university,
                                  },
                        ],
                    },
                })
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
                bio: stringArg(),
            },
            resolve: (_parent, args, ctx) => {
                if (!isValidEmail(args.email))
                    throw new Error(
                        'Email is not valid. Please enter a valid university email'
                    )
                if (!isValidUsername(args.username))
                    throw new Error(
                        'Username is not valid. Please ensure it contains no special characters'
                    )

                return ctx.prisma.users.create({
                    data: {
                        firstName: args.firstName,
                        lastName: args.lastName,
                        university: args.university,
                        course: args.course,
                        birthday: args.birthday,
                        username: args.username,
                        email: args.email,
                        bio: args.bio ?? '',
                        settings: {
                            create: {},
                        },
                    },
                    include: { settings: true },
                }) as unknown as UserObjectWithSettings
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
                const temp: TempUserObject = { ...args } as TempUserObject
                delete temp.id // removes id property so that it is not passed in the updates.
                const userUpdates: UserUpdateObject = temp

                if (args.username)
                    if (!isValidUsername(args.username))
                        throw new Error(
                            'Username is not valid. Please ensure it contains no special characters'
                        )

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
            resolve: async (_, args, ctx) => {
                const temp = (await ctx.prisma.users.findUnique({
                    where: {
                        email: args.email,
                    },
                    // gets the users settings
                    include: {
                        settings: true,
                        friends: true,
                        Friends_Friends_friendIDToUsers: true,
                    },
                })) as unknown as UserObjectWithSettingsAndFriends
                if (!temp) throw Error('User not found')
                return {
                    ...temp,
                    friends: temp.friends.concat(
                        (
                            temp as unknown as {
                                Friends_Friends_friendIDToUsers: FriendsWithID[]
                            }
                        ).Friends_Friends_friendIDToUsers
                    ),
                }
            },
        })
    },
})

// fetches user by ID
export const UserQueryByEmail = extendType({
    type: 'Query', // query refers to returning data from the database
    definition(t) {
        t.nonNull.field('UserQueryByEmail', {
            type: 'User', // uses type user defined earlier.
            args: {
                // all arguements that can be taken by the Query.
                email: nonNull(stringArg()),
                firstName: booleanArg(),
                lastName: booleanArg(),
                university: booleanArg(),
                course: booleanArg(),
                birthday: booleanArg(),
                bio: booleanArg(),
                username: booleanArg(),
                settings: booleanArg(),
                id: booleanArg(),
                all: booleanArg(),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.users.findUnique({
                    where: {
                        // finds the unique user row in the databse with corresponding id
                        email: args.email,
                    },
                    select: args.all
                        ? undefined
                        : {
                              // selects which columns from that databse to return
                              firstName: args.firstName ?? false,
                              lastName: args.lastName ?? false,
                              university: args.university ?? false,
                              birthday: args.birthday ?? false,
                              course: args.course ?? false,
                              bio: args.bio ?? false,
                              username: args.username ?? false,
                              settings: args.settings ?? false,
                              id: args.id ?? false,
                          },
                }) as unknown as UserObjectWithSettings
            },
        })
    },
})

export const Email = objectType({
    name: 'Email',
    definition(t) {
        t.nullable.string('email')
    },
})
// gets users Auth information from their username.
export const GetAuthFromUsername = extendType({
    type: 'Query', // returns data from the database.
    definition(t) {
        t.nonNull.field('getAuthFromUsername', {
            type: 'Email', // uses type user defined earlier.
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
                }) as unknown as EmailQuery
            },
        })
    },
})

// query to check whether username is taken or not
export const CheckUsernameIsTaken = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('CheckUsernameIsTaken', {
            type: 'Boolean',
            args: {
                username: nonNull(stringArg()), // takes potential username as an arguement
            },
            resolve: async (_, args, ctx) => {
                // attempts to find a row in the table users with the matching username
                const user = await ctx.prisma.users.findUnique({
                    where: {
                        username: args.username,
                    },
                })

                // if defined returns true else false.
                const result = !!user
                return result
            },
        })
    },
})
