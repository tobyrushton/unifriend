import { Settings } from './settings'

export interface createUserObject {
    birthday: string
    firstName: string
    lastName: string
    course: string
    username: string
    email: string
}

export interface createUserObjectWithUniversity extends createUserObject {
    university: string
}

export interface UserObject extends createUserObjectWithUniversity {
    bio: string
}

export interface UserObjectWithID extends UserObject {
    id: string
}

export interface UserUpdateObject {
    birthday?: string
    firstName?: string
    lastName?: string
    university?: string
    course?: string
    username?: string
    bio?: string
}

export interface UserObjectWithSettings extends UserObjectWithID {
    settings: Settings
}

export interface tempUserObject extends UserUpdateObject {
    id?: string
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

export interface CheckUsernameIsTakenQuery<Return> {
    CheckUsernameIsTaken: Return
}
