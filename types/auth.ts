type authType = 'log in' | 'sign up'

export interface authState {
    active: boolean
    type?: authType
}

export type authProps =
    | { logIn: true; signUp?: never; changeAuth: (change: authState) => void }
    | { logIn?: never; signUp: true; changeAuth: (change: authState) => void }

export interface signUpState {
    firstName: string
    lastName: string
    email: string
    password: string
    birthday: string
    username: string
    course: string
}

export interface logInState {
    email:string
    password: string
}
