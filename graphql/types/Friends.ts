import { extendType, nonNull, objectType, stringArg } from 'nexus'
import {
    FriendID,
    FriendReturn,
    FriendReturnOne,
    FriendReturnTwo,
    FriendsWithID,
} from '../../types'
import { DateTime } from '../scalars/DateTime'

// friend table in database
export const Friend = objectType({
    name: 'Friend',
    definition(t) {
        t.string('id')
        t.string('friendID')
        t.string('usersId')
        t.field('friendedAt', {
            type: DateTime, // uses the scalar DateTime as a type.
        })
    },
})

// friendRequest table in the database
export const FriendRequest = objectType({
    name: 'friendRequest',
    definition(t) {
        t.string('id')
        t.string('usersId')
        t.string('friendID')
        t.field('createdAt', {
            type: DateTime, // uses the scalar DateTime as a type.
        })
    },
})

// creates a new friend request
export const CreateFriendRequest = extendType({
    type: 'Mutation', // modifies data in the database
    definition(t) {
        t.nonNull.field('createFriendRequest', {
            type: 'friendRequest',
            args: {
                // takes the users who sent and whos to ids as arguements
                friendID: nonNull(stringArg()),
                usersId: nonNull(stringArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.friendRequests.create({
                    data: args, // creates a new friend request.
                }) as unknown as FriendsWithID
            },
        })
    },
})

// creates a new friendship
export const createFriend = extendType({
    type: 'Mutation', // modifies data in the database
    definition(t) {
        t.nonNull.field('createFriend', {
            type: 'Friend',
            args: {
                // takes the users who sent and whos to ids as arguements
                friendID: nonNull(stringArg()),
                usersId: nonNull(stringArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.friends.create({
                    data: args, // creates a new friend
                }) as unknown as FriendID
            },
        })
    },
})

// removes a friendship
export const DeleteFriend = extendType({
    type: 'Mutation', // modifies data in the database.
    definition(t) {
        t.nonNull.field('deleteFriend', {
            type: 'Friend',
            args: {
                // takes the id of the 2 users who have a friendship.
                friendID: nonNull(stringArg()),
                usersId: nonNull(stringArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.friends.delete({
                    where: args, // deletes a friend
                }) as unknown as FriendID
            },
        })
    },
})

export const DeleteFriendRequest = extendType({
    type: 'Mutation', // modifies data in the database.
    definition(t) {
        t.nonNull.field('deleteFriendRequest', {
            type: 'friendRequest',
            args: {
                friendID: nonNull(stringArg()),
                usersId: nonNull(stringArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.friendRequests.delete({
                    where: args, // deletes a friend,
                }) as unknown as FriendID
            },
        })
    },
})

export const getFriendRequests = extendType({
    type: 'Query', // gets database from the database
    definition(t) {
        t.nonNull.list.field('getFriendRequests', {
            type: 'friendRequest',
            args: {
                // takes the users Id as an arguement
                usersId: nonNull(stringArg()),
            },
            resolve: async (_parent, args, ctx) => {
                return (await ctx.prisma.friendRequests.findMany({
                    where: args, // returns all rows with the corresponding user ID
                })) as FriendID[]
            },
        })
    },
})

export const getFriends = extendType({
    type: 'Query', // gets database from the database
    definition(t) {
        t.nonNull.list.field('getFriends', {
            type: 'User',
            args: {
                // takes the users Id as an arguement
                usersId: nonNull(stringArg()),
            },
            resolve: async (_parent, args, ctx) => {
                const query1: FriendReturn[] =
                    await ctx.prisma.friends.findMany({
                        where: args, // returns all rows with the corresponding user ID
                        select: {
                            Users_Friends_friendIDToUsers: true,
                        },
                    })

                const query2: FriendReturn[] =
                    await ctx.prisma.friends.findMany({
                        where: {
                            friendID: args.usersId,
                        }, // returns all rows with the corresponding user ID
                        select: {
                            Users: true,
                        },
                    })

                const friends = (query1.concat(query2) as FriendReturn[]).map(
                    item =>
                        (item as FriendReturnOne)
                            .Users_Friends_friendIDToUsers ??
                        (item as FriendReturnTwo).Users
                )

                return friends
            },
        })
    },
})
