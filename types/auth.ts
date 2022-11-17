type authType = 'log in' | 'sign up'

export interface authState {
    active: boolean
    type?: authType
}

export type authProps =
    | { logIn: true; signUp?: never; changeAuth: (change: authState) => void }
    | { logIn?: never; signUp: true; changeAuth: (change: authState) => void }
