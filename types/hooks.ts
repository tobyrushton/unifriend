import { UserObjectWithID } from "./User"

export interface graphQLHookReturn{
    success: boolean,
    error: Error | undefined,
    loading: boolean
}

export interface graphQLHookReturnQuery extends graphQLHookReturn {
    data: UserObjectWithID
}

export interface UpdateUserParamaters {
    id: string
    course?: string
    university?: string
    birthday?:string
    firstName?:string
    lastName?: string
    bio?:string
    username?:string
}

export interface SelectUserByIDParameters {
    id:string
    course?: boolean
    university?: boolean
    birthday?:boolean
    firstName?:boolean
    lastName?: boolean
    bio?: boolean
    username?: boolean
}