import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import { MessageId, MessageWithId } from '../../types'
import { DateTime } from '../scalars/DateTime'

// table messages in the database
export const Message = objectType({
    name: 'Message',
    definition(t) {
        t.int('id')
        t.string('senderID')
        t.string('recipientID')
        t.boolean('seen')
        t.list.field('sentAt', {
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
                senderID: nonNull(stringArg()),
                recipientID: nonNull(stringArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.messages.create({
                    data: args, // creates new row in the database.
                }) as unknown as MessageWithId
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
                id: nonNull(intArg()),
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
                id: nonNull(intArg()),
            },
            resolve: (_parent, args, ctx) => {
                return ctx.prisma.messages.delete({
                    where: { id: args.id }, // deletes row in the database
                }) as unknown as MessageId
            },
        })
    },
})

//functions to be fixed during iteration 3

// // gets messages by the id of the sender
// export const GetMessageBySenderID = extendType({
//     type: 'Subscription', // creates a realtime subscription to data in the database.
//     definition(t) {
//         t.nonNull.field('getMessageBySenderID', {
//             type: Message, // users the type Message defined previously.
//             args: {
//                 // takes sender id as a parameter
//                 id: nonNull(stringArg()),
//             },
//             subscribe: (_parent, args, ctx) => {
//                 return ctx.prisma.$subscribe.messages({
//                     // creates a subscription to watch for new or updated messages
//                     mutation_in: ['CREATED', 'UPDATED'],
//                     node: {
//                         senderID_contains: args.id,
//                     },
//                 })
//             }, // returns the messages
//             resolve: payload => {
//                 return payload
//             },
//         })
//     },
// })

// // gets messages by the id of the recipient
// export const GetMessagesByRecipientID = extendType({
//     type: 'Subscription', // creates a realtime subscription to data in the database.
//     definition(t) {
//         t.nonNull.field('getMessagesByRecipientID', {
//             type: Message, // users the type Message defined previously.
//             args: {
//                 // takes recipient id as an arguement
//                 id: nonNull(stringArg()),
//             },
//             subscribe: (_parent, args, ctx) => {
//                 return ctx.prisma.$subscribe.messages({
//                     // creates a subscription to watch for new or updated messages
//                     mutation_in: ['CREATED', 'UPDATED'],
//                     node: {
//                         recipientID_contains: args.id,
//                     },
//                 })
//             }, // returns the messages
//             resolve: payload => {
//                 return payload
//             },
//         })
//     },
// })
