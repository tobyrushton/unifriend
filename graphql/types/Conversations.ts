import { objectType, nonNull, stringArg, extendType } from 'nexus'
import {
    Conversation as ConversationType,
    ConversationFetchOne,
    ConversationFetchTwo,
    ConversationPartial,
    ConversationReturn as ConversationReturnType,
} from '../../types'
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

export const UserFromConversationReturn = objectType({
    name: 'UserFromConversationReturn',
    definition(t) {
        t.string('id')
        t.string('firstName')
        t.string('lastName')
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

export const GetConversation = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('getConversation', {
            type: Conversation,
            args: {
                userOneId: nonNull(stringArg()),
                userTwoId: nonNull(stringArg()),
            },
            resolve: async (_, args, ctx) => {
                const query1: ConversationPartial | null =
                    await ctx.prisma.conversations.findFirst({ where: args })

                const query2: ConversationPartial | null =
                    await ctx.prisma.conversations.findFirst({
                        where: {
                            userOneId: args.userTwoId,
                            userTwoId: args.userTwoId,
                        },
                    })

                return (query1 ?? query2) as ConversationType
            },
        })
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
                ).map((item: ConversationFetchTwo) => ({
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
                ).map((item: ConversationFetchOne) => ({
                    id: item.id,
                    usersId: item.userOne.id,
                    username: item.userOne.username,
                }))

                return query1.concat(query2)
            },
        })
    },
})

export const GetUserIdFromConversationId = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('GetUserIdFromConversationId', {
            type: 'UserFromConversationReturn',
            args: {
                conversationId: nonNull(stringArg()),
                email: nonNull(stringArg()),
            },
            resolve: async (_, args, ctx) => {
                const user = await ctx.prisma.users.findUnique({
                    where: { email: args.email },
                    select: { id: true },
                })
                if (!user) throw new Error('No account exists')
                const { id } = user

                const conversation = await ctx.prisma.conversations.findUnique({
                    where: { id: args.conversationId },
                })
                if (!conversation) throw new Error('No conversation exists')

                const userId =
                    conversation.userOneId === id
                        ? conversation.userTwoId
                        : conversation.userOneId

                const foundUser = await ctx.prisma.users.findUnique({
                    where: { id: userId },
                    select: { firstName: true, lastName: true },
                })
                if (!foundUser) throw new Error('No user found')

                return {
                    id: userId,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                }
            },
        })
    },
})
