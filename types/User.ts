export interface UserObject {
    age: number
    firstName: string
    lastName: string
    university: string
    course: string
}

export interface UserObjectWithID extends UserObject {
    id: string
}