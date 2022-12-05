import { AuthError, Session, User } from '@supabase/supabase-js'
import { DocumentNode, GraphQLError } from 'graphql'
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
}

export interface AuthenticationHookReturn<T> {
    loading: boolean
    error: AuthError | null
    response: (email: T, password: T) => Promise<void>
}

export interface GetEmailParams {
    username: string
}

export interface AuthenticationHookReturnWithData<T>
    extends AuthenticationHookReturn<T> {
    data: authDataType
}

export interface authDataType {
    user: User | null
    session:
        | Session
        | null
        | {
              user: null
              session: null
          }
}

export interface authStatusReturnType {
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
    error: readonly GraphQLError[] | undefined
}

export type ApolloMutationFunction = <Return, Params>(
    args: Join<Mutation, Params>
) => Promise<ApolloMutationFunctionReturn>

export interface ApolloMutationReturn {
    loading: boolean
    mutation: ApolloMutationFunction
}

export type emailQuery = {
    email: string
}

export type userQueryReturnInterface<Return extends object, T> = Return & {
    __typename: T
}

export interface getUserFromAuthQuery<Return extends object, T> {
    getUserFromAuth: userQueryReturnInterface<Return, T>
}

export interface CheckUsernameIsTaken<Return> {
    CheckUsernameIsTaken: Return
}
