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
                // create a conversation
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
                // get a conversation
                const query1: ConversationPartial | null =
                    await ctx.prisma.conversations.findFirst({ where: args })

                // if the conversation doesn't exist,
                // then we need to reverse the userOneId and userTwoId
                const query2: ConversationPartial | null =
                    await ctx.prisma.conversations.findFirst({
                        where: {
                            userOneId: args.userTwoId,
                            userTwoId: args.userTwoId,
                        },
                    })

                // return the conversation
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
                })) // map the data to the correct format

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
                })) // map the data to the correct format

                // return the conversations
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
                // get the user id from the conversation id
                const user = await ctx.prisma.users.findUnique({
                    where: { email: args.email },
                    select: { id: true },
                })
                // if the user doesn't exist, then throw an error
                if (!user) throw new Error('No account exists')
                const { id } = user

                // get the conversation
                const conversation = await ctx.prisma.conversations.findUnique({
                    where: { id: args.conversationId },
                })
                if (!conversation) throw new Error('No conversation exists')

                // get the other user id
                const userId =
                    conversation.userOneId === id
                        ? conversation.userTwoId
                        : conversation.userOneId

                // get the user
                const foundUser = await ctx.prisma.users.findUnique({
                    where: { id: userId },
                    select: { firstName: true, lastName: true },
                })
                // if the user doesn't exist, then throw an error
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
