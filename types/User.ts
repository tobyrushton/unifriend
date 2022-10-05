export interface UserObject {
    birthday: string
    firstName: string
    lastName: string
    university: string
    course: string
}

export interface UserObjectWithID extends UserObject {
    id: string
}
