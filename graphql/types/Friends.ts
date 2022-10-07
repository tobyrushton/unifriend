import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { resolve } from 'path'
import { DateTime } from '../scalars/DateTime'

export const Friend = objectType({
    name: 'Friend',
    definition(t) {
        t.int('id')
        t.string('friendID')
        t.string('usersId')
        t.list.field('friendedAt', {
            type: DateTime
        })
    },
})

export const FriendRequest = objectType({
    name: 'friendRequest',
    definition(t){
        t.int('id'),
        t.string('usersId')
        t.string('friendID'),
        t.list.field('createdAt', {
            type: DateTime
        }),
        t.boolean('status')
    }
})

export const CreateFriendRequest = extendType({
    type: 'Mutation',
    definition(t){
        t.nonNull.field('createFriendRequest', {
            type: 'friendRequest',
            args: {
                friendID: nonNull(stringArg()),
                usersId: nonNull(stringArg())
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.friendRequests.create({
                    data: args
                })
            }
        })
    }
})

export const createFriend = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createFriend', {
            type:'Friend',
            args: {
                usersId: nonNull(stringArg()),
                friendID: nonNull(stringArg())
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.friends.create({
                    data: args
                })
            }
        })
    },
})