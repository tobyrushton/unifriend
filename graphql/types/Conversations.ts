import { objectType, nonNull, stringArg, extendType } from 'nexus'
import { Conversation as ConversationType } from '../../types'
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

export const GetConversations = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('getConversations', {
            type: Conversation,
            args: {
                id: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.conversations.findUnique({
                    where: args,
                    select: { messages: true },
                }) as unknown as ConversationType
            },
        })
    },
})
