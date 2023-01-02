import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { MaybePromise } from 'nexus/dist/core'
import { MessageId, MessageWithId } from '../../types'
import { DateTime } from '../scalars/DateTime'

// table messages in the database
export const Message = objectType({
    name: 'Message',
    definition(t) {
        t.string('id')
        t.string('conversationId')
        t.string('senderId')
        t.boolean('seen')
        t.field('sentAt', {
            type: DateTime, // uses the scalar DateTime as a type.
        })
        t.string('message')
    },
})

// creates a new message.
export const CreateMessage = extendType({
    type: 'Mutation', // modifies data in the database
    definition(t) {
        t.nonNull.field('createMessage', {
            type: Message, // users the type Message defined previously.
            args: {
                // takes the message content, sender and recipients id as arguements
                message: nonNull(stringArg()),
                senderId: nonNull(stringArg()),
                conversationId: nonNull(stringArg()),
            },
            resolve: async (_parent, args, ctx) => {
                const message = await ctx.prisma.conversations.update({
                    where: { id: args.conversationId },
                    data: {
                        messages: {
                            create: {
                                senderId: args.senderId,
                                message: args.message,
                            },
                        },
                    }, // creates new row in the database.
                    include: { messages: true },
                })
                ctx.pubsub.publish('MESSAGE_SENT', {
                    messageSent: message.messages.at(-1),
                })
                return message as unknown as MessageWithId
            },
        })
    },
})

// updates a message to be read.
export const MarkMessageAsRead = extendType({
    type: 'Mutation', // modifies data in the database
    definition(t) {
        t.nonNull.field('markMessageAsRead', {
            type: Message, // users the type Message defined previously.
            args: {
                // takes the  id of the message as a parameter.
                id: nonNull(stringArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.messages.update({
                    where: { id: args.id },
                    data: {
                        seen: true, // updates seen attribute to true.
                    },
                }) as unknown as MessageWithId
            },
        })
    },
})

// deletes message
export const DeleteMessage = extendType({
    type: 'Mutation', // modifies data in the database
    definition(t) {
        t.nonNull.field('deleteMessage', {
            type: Message, // users the type Message defined previously.
            args: {
                // takes the id of the message as a parameter
                id: nonNull(stringArg()),
            },
            resolve: async (_parent, args, ctx) => {
                const message = (await ctx.prisma.messages.delete({
                    where: { id: args.id }, // deletes row in the database
                })) as unknown as MessageId

                ctx.pubsub.publish('MESSAGE_DELETED', {
                    messageDeleted: message,
                })
                return message
            },
        })
    },
})

export const GetInitialMessages = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('GetMessages', {
            type: Message,
            args: {
                id: nonNull(stringArg()),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.messages.findMany({
                    where: {
                        conversationId: args.id,
                    },
                    take: 20, // gets initial 20 messages
                })
            },
        })
    },
})

export const GetMessagesSubscription = extendType({
    type: 'Subscription',
    definition(t) {
        t.nonNull.list.field('GetMessageUpdates', {
            type: Message,
            args: {
                id: nonNull(stringArg()),
            },
            subscribe: (_, _args, ctx) =>
                ctx.pubsub.asyncIterator(['MESSAGE_SENT', 'MESSAGE_DELETED']),
            resolve: payload =>
                payload as MaybePromise<
                    ({
                        conversationId?: string | null | undefined
                        id?: string | null | undefined
                        message?: string | null | undefined
                        recipientID?: string | null | undefined
                        seen?: boolean | null | undefined
                        sentAt?: any
                    } | null)[]
                >,
        })
    },
})
