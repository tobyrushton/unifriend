import { AuthError, Session } from '@supabase/supabase-js'
import { DocumentNode } from 'graphql'
import { createNotificationType, NotificationInterface } from './providers'

export interface UpdateUserParamaters {
    id: string
    course?: string
    university?: string
    birthday?: string
    firstName?: string
    lastName?: string
    bio?: string
    username?: string
}

export interface SelectUserByIDParameters {
    id: string
    course?: boolean
    university?: boolean
    birthday?: boolean
    firstName?: boolean
    lastName?: boolean
    bio?: boolean
    username?: boolean
    all?: boolean
}

export interface AuthenticationParams {
    email: string
    password: string
}

export interface AuthenticationFunctionReturn {
    error: AuthError | null
    success: boolean
}

export type AuthenticationFunction<T = void> = (
    args: T
) => Promise<AuthenticationFunctionReturn>

export interface AuthenticationHook<T = void> {
    loading: boolean
    response: AuthenticationFunction<T>
}

export interface GetEmailParams {
    username: string
}

export interface AuthStatusReturnType {
    session: Session | null
    loading: boolean
    passwordResetRequest: boolean
    resetPassword: (password: string) => Promise<void>
}

export type notificationQueueReturn = [
    queue: Array<NotificationInterface | undefined>,
    createNotification: createNotificationType,
    deleteNotification: (idx: number) => void
]

export interface CheckUsernameArgs {
    username: string
}

export interface BooleanReturn {
    result: boolean
}

export type AddTypename<Return extends object, T> = Return & {
    __typename: T
}

export interface ApolloQueryFunctionReturn<T> {
    data: T | undefined
    error: Error | undefined
}

export type Join<X, Y> = X & Y

export interface Query {
    query: DocumentNode
}

export interface Mutation {
    mutation: DocumentNode
}

export type ApolloQueryFunction = <Return, Params>(
    args: Join<Params, Query>
) => Promise<ApolloQueryFunctionReturn<Return>>

export interface ApolloQueryReturn {
    loading: boolean
    query: ApolloQueryFunction
}

export interface ApolloMutationFunctionReturn {
    success: boolean
    error: readonly Error[] | undefined
}

/* eslint-disable-next-line */
export type ApolloMutationFunction = <Return, Params>(
    args: Join<Mutation, Params>
) => Promise<ApolloMutationFunctionReturn>

export interface ApolloMutationReturn {
    loading: boolean
    mutation: ApolloMutationFunction
}

export type EmailQuery = {
    email: string
}

export type QueryReturnInterface<Return extends object, T> = Return & {
    __typename: T
}

export type IDArguement = {
    id: string
}

export type QueryReturn<Return, T, X extends string> = {
    [K in X]: Return extends object ? QueryReturnInterface<Return, T> : Return
}
