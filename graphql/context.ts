import { PrismaClient } from '@prisma/client'
import { createPubSub, PubSub } from 'graphql-yoga'
import prisma from '../lib/prisma'
import { MessageWithId } from '../types'

type PubSubArgs = {
    newMessage: [conversationId: string, payload: MessageWithId]
}

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
