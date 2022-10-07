export interface UserObject {
    birthday: string
    firstName: string
    lastName: string
    university: string
    course: string
    username: string
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
