import { PrismaClient } from '@prisma/client'
import { createPubSub, PubSub } from 'graphql-yoga'
import prisma from '../lib/prisma'
import { IDArguement, MessageWithId } from '../types'

// Define the arguments that can be passed to the pubsub instance
type PubSubArgs = {
    newMessage: [conversationId: string, payload: MessageWithId]
    messageRead: [conversationId: string, payload: IDArguement]
    messageDeleted: [conversationId: string, payload: IDArguement]
}

// Create a pubsub instance
// This is used to publish and subscribe to events
const pubsub = createPubSub<PubSubArgs>()

export type Context = {
    prisma: PrismaClient
    pubsub: PubSub<PubSubArgs>
}

export async function createContext(): Promise<Context> {
    return {
        prisma,
        pubsub,
    }
}
