type authType = 'log in' | 'sign up'

export interface authState {
    active: boolean
    type?: authType
}

export type authProps = {logIn:true, signUp?:never} | {logIn?:never, signUp: true}