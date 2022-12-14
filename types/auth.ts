type authType = 'log in' | 'sign up'

export interface AuthState {
    active: boolean
    type?: authType
}

export type AuthProps =
    | { logIn: true; signUp?: never; changeAuth: (change: AuthState) => void }
    | { logIn?: never; signUp: true; changeAuth: (change: AuthState) => void }

export interface SignUpState {
    firstName: string
    lastName: string
    email: string
    password: string
    birthday: string
    username: string
    course: string
}

export interface LogInState {
    email: string
    password: string
}

export type ErrorTextState =
    | {
          active: false
      }
    | {
          active: true
          content: string
      }
