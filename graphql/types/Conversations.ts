import { objectType, nonNull, stringArg, extendType } from 'nexus'
import { ConversationReturn as ConversationReturnType } from '../../types'
import { Message } from './Messages'

export const Conversation = objectType({
    name: 'Conversation',
    definition(t) {
        t.string('id')
        t.string('userOneId')
        t.string('userTwoId')
        t.list.field('messages', { type: Message })
    },
})

export const CreateConversations = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('CreateConversation', {
            type: Conversation,
            args: {
                userOneId: nonNull(stringArg()),
                userTwoId: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.conversations.create({
                    data: args,
                })
            },
        })
    },
})

export const ConversationReturn = objectType({
    name: 'ConversationReturn',
    definition(t) {
        t.string('id')
        t.string('usersId')
        t.string('username')
    },
})

export const GetConversations = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('getConversations', {
            type: ConversationReturn,
            args: {
                id: nonNull(stringArg()),
            },
            resolve: async (_, args, ctx) => {
                const query1: ConversationReturnType[] = (
                    await ctx.prisma.conversations.findMany({
                        where: { userOneId: args.id },
                        select: {
                            id: true,
                            userTwo: true,
                        },
                    })
                ).map(item => ({
                    id: item.id,
                    usersId: item.userTwo.id,
                    username: item.userTwo.username,
                }))

                const query2: ConversationReturnType[] = (
                    await ctx.prisma.conversations.findMany({
                        where: { userTwoId: args.id },
                        select: {
                            id: true,
                            userOne: true,
                        },
                    })
                ).map(item => ({
                    id: item.id,
                    usersId: item.userOne.id,
                    username: item.userOne.username,
                }))

                return query1.concat(query2)
            },
        })
    },
})
