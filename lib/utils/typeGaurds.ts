import { logInState, signUpState } from '../../types'

// allows me to check the type of the state before performing any sign up or log in operations
export const isSignUpState = (
    toBeDetermined: logInState | signUpState | undefined
): toBeDetermined is signUpState => {
    // birthday is a property unique to signUpState so this will determine whether it is of the typ signUpState or not.
    if ((toBeDetermined as signUpState).birthday) {
        return true
    }
    return false
}
