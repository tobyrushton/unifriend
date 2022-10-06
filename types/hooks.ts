export interface graphQLHookReturn{
    success: boolean,
    error: Error | undefined,
    loading: boolean
}

export interface UpdateUserParamaters {
    course?: string
    university?: string
    birthday?:string
    firstName?:string
    lastName?: string
}

export interface SelectUserByIDParameters {
    id:string
    course?: boolean
    university?: boolean
    birthday?:boolean
    firstName?:boolean
    lastName?: boolean
}