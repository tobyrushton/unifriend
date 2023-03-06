import { University, UniversityEmailArray } from '../../types'
import data from './universities.json'

const UniversityEmailEndings: UniversityEmailArray =
    data as UniversityEmailArray

// checks whether an input is a valid email ending in .ac.uk
export const isValidEmail = (email: string): boolean => {
    if (email.split('@')[1] === 'gmail.com') return true // for testing code -- remove for post
    // regex experession that checks if string is in the form 'something@something.ac.uk'
    const regex = /^.*@.*[.]ac[.]uk$/i
    const emailLowerCase = email.toLowerCase()
    const regexTest: boolean = regex.test(emailLowerCase)
    const madeOfTwoParts: boolean = email.split('@')[0].length !== 0
    return regexTest && madeOfTwoParts
}

// checks if the password is valid
export const isValidPassword = (password: string): boolean => {
    if (password.length < 8 || password.length > 16) return false
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

// function to return the university of a user upon sign up
export const getUniversity = (email: string): University | null => {
    const emailEnding = '@'.concat(email.split('@')[1])

    // returns the first item in the array UniversityEmailEndings that matches the email ending.
    const findUniversity = UniversityEmailEndings.find(val => {
        return val.email === emailEnding
    })
    if (findUniversity) {
        return findUniversity.university
    }
    // if not found returns null, indicates that there is an error with the email.
    return null
}
