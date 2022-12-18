import { Settings } from './settings'

export interface ShellUser {
    birthday: string
    firstName: string
    lastName: string
    course: string
    username: string
}

export interface CreateUserObject extends ShellUser {
    email: string
}

export interface CreateUserObjectWithUniversity extends CreateUserObject {
    university: string
}

export interface UserObject extends CreateUserObjectWithUniversity {
    bio: string
}

export interface UserObjectWithID extends UserObject {
    id: string
}

export interface UpdateUserReturn extends ShellUser {
    id: string
    bio: string
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

export interface TempUserObject extends UserUpdateObject {
    id?: string
}

export type UserFromFriend = {
    id: string
    username: string
    rowId: string
}

export type UserFromConversation = {
    id: string
    username: string
}
