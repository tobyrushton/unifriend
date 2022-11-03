import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import { DateTime } from '../scalars/DateTime'

export const Message = objectType({
    name: 'Message',
    definition(t) {
        t.int('id')
        t.string('senderID')
        t.string('recipientID')
        t.boolean('seen')
        t.list.field('sentAt', {
            type: DateTime,
        })
        t.string('message')
    },
})

export const CreateMessage = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createMessage', {
            type: Message,
            args: {
                message: nonNull(stringArg()),
                senderID: nonNull(stringArg()),
                recipientID: nonNull(stringArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.messages.create({
                    data: args,
                })
            },
        })
    },
})

export const MarkMessageAsRead = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('markMessageAsRead', {
            type: Message,
            args: {
                id: nonNull(intArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.messages.update({
                    where: { id: args.id },
                    data: {
                        seen: true,
                    },
                })
            },
        })
    },
})

export const DeleteMessage = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('deleteMessage', {
            type: Message,
            args: {
                id: nonNull(intArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.messages.delete({
                    where: { id: args.id },
                })
            },
        })
    },
})

export const GetMessageBySenderID = extendType({
    type: 'Subscription',
    definition(t) {
        t.nonNull.field('getMessageBySenderID', {
            type: Message,
            args: {
                id: nonNull(stringArg()),
            },
            subscribe: (_parent, args, ctx) => {
                return ctx.prisma.$subscribe.messages({
                    mutation_in: ['CREATED','UPDATED'],
                    node: {
                        senderID_contains: args.id
                    }
                })
            },
            resolve: (payload) => {
                return payload
            },
        })
    },
})

export const GetMessagesByRecipientID = extendType({
    type: 'Subscription',
    definition(t) {
        t.nonNull.field('getMessagesByRecipientID', {
            type: Message,
            args: {
                id: nonNull(stringArg()),
            },
            subscribe: (_parent, args, ctx) => {
                return ctx.prisma.messages.findMany({
                    where: {
                        recipientID: args.id
                    }
                })
            },
            resolve: (payload) => {
                return payload
            },
        })
    },
})
