import { extendType, nonNull, objectType, stringArg } from 'nexus'
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
                const messages = await ctx.prisma.conversations.update({
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

                const message: MessageWithId = messages.messages.at(
                    -1
                ) as MessageWithId

                ctx.pubsub.publish('newMessage', args.conversationId, message)

                return message
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
            resolve: async (_parent, args, ctx) => {
                const data = (await ctx.prisma.messages.update({
                    where: { id: args.id },
                    data: {
                        seen: true, // updates seen attribute to true.
                    },
                })) as unknown as MessageWithId

                ctx.pubsub.publish('messageRead', data.conversationId, {
                    id: data.id,
                })

                return data
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
                    orderBy: { sentAt: 'desc' }, // orders by most recent
                    take: 20, // gets initial 20 messages
                })
            },
        })
    },
})

export const GetMessagesSubscription = extendType({
    type: 'Subscription',
    definition(t) {
        t.nonNull.field('GetMessageUpdates', {
            type: Message,
            args: {
                id: nonNull(stringArg()),
            },
            subscribe: (_, args, ctx) =>
                // subscribes to new messages with matching id
                ctx.pubsub.subscribe('newMessage', args.id),
            resolve: payload => payload, // returns message when new message is published
        })
    },
})

export const MessageFromMarkAsReadSubscription = objectType({
    name: 'IDArguement',
    definition(t) {
        t.string('id')
    },
})

export const MarkMessageAsReadSubscription = extendType({
    type: 'Subscription',
    definition(t) {
        t.nonNull.field('MarkMessageAsRead', {
            type: 'IDArguement',
            args: {
                id: nonNull(stringArg()),
            },
            subscribe: (_, args, ctx) =>
                // subscribes to messages updating with matching id
                ctx.pubsub.subscribe('messageRead', args.id),
            resolve: payload => payload, // returns message message id when message is updated
        })
    },
})
