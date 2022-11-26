import {
    isValidPassword,
    isValidUsername,
    isValidEmail,
    getUniversity,
} from '../../lib/utils'
import data from '../../lib/utils/universities.json'
import { UniversityEmailArray } from '../../types'

describe('validation tests', () => {
    it('should return false with invalid username', () => {
        expect(isValidUsername('toby&')).toBeFalsy()
        expect(isValidUsername('1234567890123456789')).toBeFalsy()
        expect(isValidUsername('12')).toBeFalsy()
        expect(isValidUsername('')).toBeFalsy()
    })

    it('should return true with valid username', () => {
        expect(isValidUsername('toby')).toBeTruthy()
        expect(isValidUsername('tob')).toBeTruthy()
        expect(isValidUsername('tobyrushton')).toBeTruthy()
        expect(isValidUsername('1234567890123456')).toBeTruthy()
    })

    it('should return false with invalid email', () => {
        expect(isValidEmail('@leeds.ac.uk')).toBeFalsy()
        expect(isValidEmail('email@email.gmail')).toBeFalsy()
        expect(isValidEmail('email@email.ac.uk.com')).toBeFalsy()
    })

    it('should return true with valid email', () => {
        expect(isValidEmail('toby@leeds.ac.uk')).toBeTruthy()
        expect(isValidEmail('toby.rushton@kcl.ac.uk')).toBeTruthy()
        expect(isValidEmail('toby31@leeds.ac.uk')).toBeTruthy()
    })

    it('should return false with invalid password', () => {
        expect(isValidPassword('')).toBeFalsy()
        expect(isValidPassword('HJgjhk!!Hsjsd23434')).toBeFalsy()
        expect(isValidPassword('password1234')).toBeFalsy()
        expect(isValidPassword('Password1234')).toBeFalsy()
        expect(isValidPassword('Password@@')).toBeFalsy()
        expect(isValidPassword('Password!_')).toBeFalsy()
    })

    it('should return true with valid password', () => {
        expect(isValidPassword('Password12_')).toBeTruthy()
        expect(isValidPassword('pASSwO_2')).toBeTruthy()
        expect(isValidPassword('pasWord_!2')).toBeTruthy()
        expect(isValidPassword('Password_1234567')).toBeTruthy()
    })

    const UniverityList: UniversityEmailArray = data as UniversityEmailArray

    it('should return all emails successfully', () => {
        UniverityList.forEach(val => {
            expect(getUniversity('test'.concat(val.email))).toEqual(
                val.university
            )
        })
    })

    it('should no return university from emails', () => {
        expect(getUniversity('test@kcl.ac.uk.com')).toBeNull()
        expect(getUniversity('test@email.com')).toBeNull()
        expect(getUniversity('test@email.co.uk')).toBeNull()
        expect(getUniversity('test@hotmail.com')).toBeNull()
    })
})
