import { AuthError, Session, User } from '@supabase/supabase-js'
import {
    MutationFunctionOptions,
    DefaultContext,
    ApolloCache,
} from '@apollo/client'
import { UserObjectWithID } from './User'
import { createNotificationType, NotificationInterface } from './providers'

export interface graphQLHookReturn {
    success: boolean
    error: Error | undefined
    loading: boolean
}

export type graphQLMutationParameters<Return, Options> = {
    options?:
        | MutationFunctionOptions<
              Return,
              Options,
              DefaultContext,
              ApolloCache<any>
          >
        | undefined
}

export interface graphQLHookReturnMutation<Return, Options>
    extends graphQLHookReturn {
    mutation: (
        args: graphQLMutationParameters<Return, Options>
    ) => Promise<UserObjectWithID>
}

export interface graphQLHookReturnQuery extends graphQLHookReturn {
    data: UserObjectWithID
}

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
}

export interface graphQLHookReturnQueryFunction<T>
    extends graphQLHookReturnQuery {
    runQuery: (args: T) => Promise<void>
}

export type notificationQueueReturn = [
    queue: Array<NotificationInterface | undefined>,
    createNotification: createNotificationType,
    deleteNotification: (idx: number) => void
]
