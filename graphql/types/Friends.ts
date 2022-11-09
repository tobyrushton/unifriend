import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { DateTime } from '../scalars/DateTime'

// friend table in database
export const Friend = objectType({
    name: 'Friend',
    definition(t) {
        t.int('id')
        t.string('friendID')
        t.string('usersId')
        t.list.field('friendedAt', {
            type: DateTime, // uses the scalar DateTime as a type.
        })
    },
})

// friendRequest table in the database
export const FriendRequest = objectType({
    name: 'friendRequest',
    definition(t) {
        t.int('id')
        t.string('usersId')
        t.string('friendID')
        t.list.field('createdAt', {
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
                })
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
                usersId: nonNull(stringArg()),
                friendID: nonNull(stringArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.friends.create({
                    data: args, // creates a new friend
                })
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
                })
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
                usersId: nonNull(stringArg())
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.friendRequests.delete({
                    where: {
                        args, // deletes a friend
                    },
                })
            },
        })
    },
})

export const getFriendRequests = extendType({
    type: 'Query', // gets database from the database
    definition(t) {
        t.nonNull.field('getFriendRequests', {
            type: 'friendRequest',
            args: {
                // takes the users Id as an arguement
                usersId: nonNull(stringArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.friendRequests.findMany({
                    where: args, // returns all rows with the corresponding user ID
                })
            },
        })
    },
})

export const getFriends = extendType({
    type: 'Query', // gets database from the database
    definition(t) {
        t.nonNull.field('getFriends', {
            type: 'Friend',
            args: {
                // takes the users Id as an arguement
                usersId: nonNull(stringArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.friends.findMany({
                    where: args, // returns all rows with the corresponding user ID
                })
            },
        })
    },
})
