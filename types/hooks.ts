import { AuthError, Session, User } from '@supabase/supabase-js'
import { createNotificationType, NotificationInterface } from './providers'

export interface graphQLHookReturn {
    success: boolean
    error: Error | undefined
    loading: boolean
}

export interface graphQLHookReturnMutation<Arg, Return>
    extends graphQLHookReturn {
    mutation: (args: Arg) => Promise<Return>
}

export interface graphQLHookReturnQuery<T> extends graphQLHookReturn {
    data: T
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
    passwordResetRequest: boolean
    resetPassword: (password: string) => Promise<void>
}

export interface graphQLHookReturnQueryFunction<T, Data>
    extends graphQLHookReturnQuery<Data> {
    runQuery: (args: T) => Promise<void>
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

export type QueryReturn<
    Return extends object,
    Attribute extends string,
    T extends string
> = {
    [P in Attribute]: AddTypename<Return, T>
}
