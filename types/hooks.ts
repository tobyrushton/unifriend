import { AuthError, Session, User } from '@supabase/supabase-js'
import { UserObjectWithID } from './User'

export interface graphQLHookReturn {
    success: boolean
    error: Error | undefined
    loading: boolean
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

export interface AuthenticationHookReturn {
    loading: boolean
    error: AuthError | null
}

export interface AuthenticationHookReturnWithData
    extends AuthenticationHookReturn {
    data: data
}

export interface data {
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

export interface graphQLHookReturnQueryFunction extends graphQLHookReturnQuery {
    runQuery: (email:string) => Promise<void>
}
