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