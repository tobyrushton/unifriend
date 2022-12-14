import { LogInState, SignUpState } from '../../types'

// allows me to check the type of the state before performing any sign up or log in operations
export const isSignUpState = (
    toBeDetermined: LogInState | SignUpState | undefined
): toBeDetermined is SignUpState => {
    // birthday is a property unique to signUpState
    // so this will determine whether it is of the typ signUpState or not.
    if (toBeDetermined) {
        if ((toBeDetermined as SignUpState).birthday !== undefined) {
            return true
        }
    }
    return false
}
