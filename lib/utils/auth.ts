// checks whether an input is a valid email ending in .ac.uk
export const isValidEmail = (email: string): boolean => {
    // regex experession that checks if string is in the form 'something@something.ac.uk'
    const regex = /^.*@.*[.]ac[.]uk]*.*$/i
    return regex.test(email)
}

// checks if the password is valid
export const isValidPassword = (password: string): boolean => {
    if (password.length < 8) return false
    // regex expression that checks if the password has a special character or upper case character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/
    return regex.test(password)
}

// checcks if the username is valid
export const isValidUsername = (username: string): boolean => {
    if (username.length < 3 || username.length > 16) return false

    // checsk that it contains only characters and numbers no spaces or speical characters
    const regex = /^[A-Za-z0-9]*$/
    return regex.test(username)
}