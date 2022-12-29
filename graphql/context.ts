import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'
import prisma from '../lib/prisma'

export type Context = {
    prisma: PrismaClient
    pubsub: PubSub
}

export async function createContext(): Promise<Context> {
    return {
        prisma,
        pubsub: new PubSub(),
    }
}
