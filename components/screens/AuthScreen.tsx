'use client'

import { FC, useState, useEffect } from 'react'
import {
    AuthProps,
    LogInState,
    SignUpState,
    signUpSlidesInterface,
    CreateUserObject,
    CreateUserObjectWithUniversity,
    ErrorTextState,
    CheckUsernameArgs,
    EmailQuery,
    GetEmailParams,
    UserObjectWithID,
    QueryReturn,
} from '../../types'
import styles from '../../styles/modules/Authentication.module.scss'
import { Input, Text, Button, Exit, ProfilePicture } from '../ui'
import { ConfirmEmailScreen } from './ConfirmEmailScreen'
import {
    useLogIn,
    useNotifications,
    useSignUp,
    useQuery,
    useMutation,
} from '../../hooks'
import { useLoadingScreen } from '../../hooks/providers/useLoadingScreen'
import {
    isSignUpState,
    isValidEmail,
    isValidPassword,
    isValidUsername,
    getUniversity,
} from '../../lib/utils'
import { ForgottenPasswordScreen } from './ForgottenPasswordScreen'
import {
    CHECK_USERNAME_IS_TAKEN,
    CREATE_USER,
    GET_AUTH_FROM_USERNAME,
} from '../../graphql/queries'
import { uploadImage } from '../../lib/utils/handleImages'

export const AuthScreen: FC<AuthProps> = ({ logIn, signUp, changeAuth }) => {
    // all state defined that is used for this screen
    const [state, setState] = useState<LogInState | SignUpState>(
        logIn
            ? {
                  email: '',
                  password: '',
              }
            : {
                  firstName: '',
                  lastName: '',
                  birthday: '',
                  email: '',
                  username: '',
                  course: '',
                  password: '',
              }
    )
    const [buttonActive, setButtonActive] = useState<boolean>(false)
    const [signUpSlides, setSignUpSlides] = useState<signUpSlidesInterface>({
        buttonActive: false,
        slide: 1,
    })
    const [displayConfirmEmail, setDisplayConfirmEmail] =
        useState<boolean>(false)
    const [displayForgottenPassword, setDisplayForgottenPassword] =
        useState<boolean>(false)
    const [displayErrorText, setDisplayErrorText] = useState<ErrorTextState[]>([
        {
            active: false,
        },
        { active: false },
    ])
    const [profilePicture, setProfilePicture] = useState<File>()
    const [previewUrl, setPreviewUrl] = useState<string>()

    // all hook responses that are needed to sign up and log in
    const { response: signIn, loading: signInLoading } = useLogIn()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()
    const { response: register, loading: signUpLoading } = useSignUp()

    const { loading: queryLoading, query } = useQuery()
    const { loading: mutationLoading, mutation } = useMutation()

    useEffect(() => {
        // sets loading screen when any loading variable is true
        setLoading(
            signInLoading || signUpLoading || queryLoading || mutationLoading
        )
    }, [
        signInLoading,
        setLoading,
        signUpLoading,
        queryLoading,
        mutationLoading,
    ])

    useEffect(() => {
        // if no profile picture inputted, sets the previewUrl to be undefined
        if (!profilePicture) {
            setPreviewUrl(undefined)
            return undefined
        }

        // gets the preview url
        const objectUrl = URL.createObjectURL(profilePicture)
        setPreviewUrl(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [profilePicture, setPreviewUrl])

    useEffect(() => {
        // displays whether the user has entered a valid email or not
        if (state?.email && state.email !== '')
            if (isValidEmail(state.email))
                setDisplayErrorText(prevState => {
                    const temp = [...prevState]
                    temp[0] = { active: false }
                    return temp
                })
            else
                setDisplayErrorText(prevState => {
                    const temp = [...prevState]
                    temp[0] = {
                        active: true,
                        content: 'Please enter a valid UK univeristy email.',
                    }
                    return temp
                })
    }, [state?.email, setDisplayErrorText])

    useEffect(() => {
        // displays whether the user has enter a valid password upon sign up or not
        if (state?.password && state.password !== '' && isSignUpState(state))
            if (isValidPassword(state.password))
                setDisplayErrorText(prevState => {
                    const temp = [...prevState]
                    temp[1] = { active: false }
                    return temp
                })
            else
                setDisplayErrorText(prevState => {
                    const temp = [...prevState]
                    temp[1] = {
                        active: true,
                        content:
                            /* eslint-disable-next-line */
                            'Password must contain a special character, a number and an upper case letter.',
                    }
                    return temp
                })
    }, [setDisplayErrorText, state])

    useEffect(() => {
        const check = async (): Promise<void> => {
            if (isSignUpState(state)) {
                const { data, error } = await query<
                    QueryReturn<boolean, '', 'CheckUsernameIsTaken'>,
                    CheckUsernameArgs
                >({
                    query: CHECK_USERNAME_IS_TAKEN,
                    username: state.username,
                })
                if (error)
                    createNotification({
                        type: 'error',
                        content: error.message,
                    })
                else if (data && data.CheckUsernameIsTaken)
                    setDisplayErrorText(prevState => {
                        const temp = [...prevState]
                        temp[0] = { active: true, content: 'Username is taken' }
                        return temp
                    })
                // if not taken, removes error text
                else
                    setDisplayErrorText(prevState => {
                        const temp = [...prevState]
                        temp[0] = { active: false }
                        return temp
                    })
            }
        }

        if (isSignUpState(state) && state.username !== '')
            if (isValidUsername(state.username))
                // if a valid username is entered, runs check username query
                check()
            // else sets the error message
            else
                setDisplayErrorText(prevState => {
                    const temp = [...prevState]
                    temp[0] = {
                        active: true,
                        content:
                            'Username must contain no special characters and be at least 3 characters long',
                    }
                    return temp
                })
    }, [setDisplayErrorText, state, createNotification, query])

    useEffect(() => {
        if (state) {
            if (logIn) {
                // if component is in logIn mode, and password and email are above certain length,
                // sets button active
                if (state.password.length >= 8 && state.email.length >= 3) {
                    setButtonActive(true)
                } else setButtonActive(false)
            }
        }
        if (isSignUpState(state)) {
            if (signUpSlides.slide === 1) {
                if (
                    isValidEmail(state.email) &&
                    state.firstName.length >= 2 &&
                    state.lastName.length >= 2
                )
                    // sets the 2nd slide to true so user can click onto it.
                    setSignUpSlides(prevState => {
                        const temp = { ...prevState }
                        temp.buttonActive = true
                        return temp
                    })
                // else sets false
                else
                    setSignUpSlides(prevState => {
                        const temp = { ...prevState }
                        temp.buttonActive = false
                        return temp
                    })
            } else if (signUpSlides.slide === 2) {
                if (
                    isValidPassword(state.password) &&
                    isValidUsername(state.username) &&
                    !displayErrorText[0].active
                )
                    // sets the 3rd slide to true so user can click onto it.
                    setSignUpSlides(prevState => {
                        const temp = { ...prevState }
                        temp.buttonActive = true
                        return temp
                    })
                // else sets false
                else
                    setSignUpSlides(prevState => {
                        const temp = { ...prevState }
                        temp.buttonActive = false
                        return temp
                    })
            } else if (signUpSlides.slide === 3) {
                if (state.birthday.length === 10 && state.course.length >= 3)
                    setSignUpSlides(prevState => {
                        const temp = { ...prevState }
                        temp.buttonActive = true
                        return temp
                    })
                // sets the last slide to true, allowing user to sign up
                // else sets to false
                else
                    setSignUpSlides(prevState => {
                        const temp = { ...prevState }
                        temp.buttonActive = false
                        return temp
                    })
            }
        }
    }, [
        state,
        logIn,
        signUp,
        setButtonActive,
        setSignUpSlides,
        signUpSlides.slide,
        displayErrorText,
    ])

    // handles sign in click
    const clickSignIn = async (): Promise<void> => {
        if (!isSignUpState(state) && state) {
            let { email } = state
            // if the user types a valid username fetches their email to use for log in
            if (isValidUsername(email)) {
                const { data, error } = await query<
                    QueryReturn<EmailQuery, 'Email', 'getAuthFromUsername'>,
                    GetEmailParams
                >({ query: GET_AUTH_FROM_USERNAME, username: email })
                if (error) {
                    // outputs error
                    createNotification({
                        type: 'error',
                        content: error.message,
                    })
                    return // exits out the function on error
                } // sets the email to be used as the email fetched
                if (data) email = data.getAuthFromUsername.email
            }
            // ensures that the state exists
            const { error } = await signIn({
                email,
                password: state.password,
            })
            if (error) {
                // displays the email confirm screen if email not confirmed
                if (error.message === 'Email not confirmed')
                    setDisplayConfirmEmail(true)
                // else displays the error in a notification
                else
                    createNotification({
                        type: 'error',
                        content: error.message as string,
                    })
            }
        }
    }

    // handles sign ups
    const clickSignUp = async (): Promise<void> => {
        if (isSignUpState(state)) {
            const university = getUniversity(state.email) // gets the users university
            if (university !== null) {
                // continues if the a university is returned
                const { error: signUpError } = await register({
                    email: state.email,
                    password: state.password,
                })
                // ensures that their is not an error with auth provider
                // before creating a row in the database
                if (signUpError)
                    createNotification({
                        type: 'error',
                        content: signUpError.message,
                    })
                else {
                    // removes the password property from state as not needed
                    const temp: Partial<Pick<SignUpState, 'password'>> &
                        Omit<SignUpState, 'password'> = state
                    delete temp.password
                    const CreateUser: CreateUserObjectWithUniversity = {
                        ...(temp as CreateUserObject),
                        ...({ university } as {
                            university: string
                        }),
                    } // combines state with the university given

                    const { success, error, data } = await mutation<
                        QueryReturn<UserObjectWithID, 'User', 'createUser'>,
                        CreateUserObjectWithUniversity
                    >({
                        mutation: CREATE_USER,
                        ...CreateUser,
                    }) // creates the user

                    if (success) {
                        createNotification({
                            type: 'success',
                            content: 'Account created successfully.',
                        })
                        // then sets the display confirm email screen to true
                        setDisplayConfirmEmail(true)

                        // uploads profile picture if set
                        if (profilePicture && data)
                            uploadImage(profilePicture, data.createUser.id)
                    } else if (error)
                        // creates error notification on error
                        error.forEach(err => {
                            createNotification({
                                type: 'error',
                                content: err.message,
                            })
                        })
                }
            } // else throws error for invalid email
            else
                createNotification({
                    type: 'error',
                    content: 'Please enter a valid UK university email',
                })
        }
    }

    return (
        <div className={styles.fazedOut}>
            <div className={styles.authContainer}>
                <Exit onClick={() => changeAuth({ active: false })} />
                <div className={styles.offset}>
                    {displayConfirmEmail ? (
                        <ConfirmEmailScreen />
                    ) : (
                        <form className={styles.form}>
                            {displayForgottenPassword ? (
                                <ForgottenPasswordScreen />
                            ) : logIn ? (
                                <>
                                    <Text header bold>
                                        Sign in
                                    </Text>
                                    <Input
                                        placeholder="Username or email"
                                        type="text"
                                        setValue={change => {
                                            setState(prevState => {
                                                const temp = {
                                                    ...prevState,
                                                } as LogInState
                                                temp.email = change
                                                return temp
                                            })
                                        }}
                                        style={{ marginTop: '5%' }}
                                    />
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        setValue={change => {
                                            setState(prevState => {
                                                const temp = {
                                                    ...prevState,
                                                } as LogInState
                                                temp.password = change
                                                return temp
                                            })
                                        }}
                                        style={{
                                            marginTop: '5%',
                                        }}
                                    />
                                    <Text
                                        clickable
                                        small
                                        style={{ marginTop: '2%' }}
                                        color="primary"
                                        onClick={() =>
                                            setDisplayForgottenPassword(true)
                                        }
                                    >
                                        Forgot your password?
                                    </Text>
                                    <Button
                                        inactive={!buttonActive}
                                        onClick={clickSignIn}
                                        style={{
                                            marginTop: '20%',
                                        }}
                                        submit
                                    >
                                        Sign In
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Text header bold>
                                        Create your account
                                    </Text>
                                    {signUpSlides.slide === 1 ? (
                                        <>
                                            <Input
                                                placeholder="First Name"
                                                type="text"
                                                setValue={change => {
                                                    setState(prevState => {
                                                        const temp = {
                                                            ...prevState,
                                                        } as SignUpState
                                                        temp.firstName = change
                                                        return temp
                                                    })
                                                }}
                                                style={{
                                                    marginTop: '2.5%',
                                                }}
                                                maxLength={16}
                                                value={
                                                    (state as SignUpState)
                                                        .firstName
                                                }
                                            />
                                            <Input
                                                placeholder="Last Name"
                                                type="text"
                                                setValue={change => {
                                                    setState(prevState => {
                                                        const temp = {
                                                            ...prevState,
                                                        } as SignUpState
                                                        temp.lastName = change
                                                        return temp
                                                    })
                                                }}
                                                style={{
                                                    marginTop: '2.5%',
                                                }}
                                                maxLength={16}
                                                value={
                                                    (state as SignUpState)
                                                        .lastName
                                                }
                                            />
                                            <Input
                                                placeholder="University Email"
                                                type="text"
                                                setValue={change => {
                                                    setState(prevState => {
                                                        const temp = {
                                                            ...prevState,
                                                        } as SignUpState
                                                        temp.email = change
                                                        return temp
                                                    })
                                                }}
                                                style={{
                                                    marginTop: '2.5%',
                                                }}
                                                maxLength={32}
                                                value={
                                                    (state as SignUpState).email
                                                }
                                            />
                                            {displayErrorText[0].active ? (
                                                <Text color="error" small>
                                                    {
                                                        displayErrorText[0]
                                                            .content
                                                    }
                                                </Text>
                                            ) : null}
                                        </>
                                    ) : (
                                        <>
                                            {signUpSlides.slide === 2 ? (
                                                <>
                                                    <Input
                                                        placeholder="Username"
                                                        type="text"
                                                        setValue={change => {
                                                            setState(
                                                                prevState => {
                                                                    const temp =
                                                                        {
                                                                            ...prevState,
                                                                        } as SignUpState
                                                                    temp.username =
                                                                        change
                                                                    return temp
                                                                }
                                                            )
                                                        }}
                                                        style={{
                                                            marginTop: '2.5%',
                                                        }}
                                                        maxLength={16}
                                                        value={
                                                            (
                                                                state as SignUpState
                                                            ).username
                                                        }
                                                    />
                                                    {displayErrorText[0]
                                                        .active ? (
                                                        <Text
                                                            color="error"
                                                            small
                                                        >
                                                            {
                                                                displayErrorText[0]
                                                                    .content
                                                            }
                                                        </Text>
                                                    ) : null}
                                                    <Input
                                                        placeholder="Password"
                                                        type="password"
                                                        setValue={change => {
                                                            setState(
                                                                prevState => {
                                                                    const temp =
                                                                        {
                                                                            ...prevState,
                                                                        } as SignUpState
                                                                    temp.password =
                                                                        change
                                                                    return temp
                                                                }
                                                            )
                                                        }}
                                                        style={{
                                                            marginTop: '2.5%',
                                                        }}
                                                        maxLength={16}
                                                        value={
                                                            (
                                                                state as SignUpState
                                                            ).password
                                                        }
                                                    />
                                                    {displayErrorText[1]
                                                        .active ? (
                                                        <Text
                                                            color="error"
                                                            small
                                                        >
                                                            {
                                                                displayErrorText[1]
                                                                    .content
                                                            }
                                                        </Text>
                                                    ) : null}
                                                </>
                                            ) : (
                                                <>
                                                    {signUpSlides.slide ===
                                                    3 ? (
                                                        <>
                                                            <Input
                                                                placeholder="Course"
                                                                type="text"
                                                                style={{
                                                                    marginTop:
                                                                        '2.5%',
                                                                }}
                                                                setValue={change => {
                                                                    setState(
                                                                        prevState => {
                                                                            const temp =
                                                                                {
                                                                                    ...prevState,
                                                                                } as SignUpState
                                                                            temp.course =
                                                                                change
                                                                            return temp
                                                                        }
                                                                    )
                                                                }}
                                                                value={
                                                                    (
                                                                        state as SignUpState
                                                                    ).course
                                                                }
                                                            />
                                                            <Input
                                                                placeholder="Birthday"
                                                                type="date"
                                                                style={{
                                                                    marginTop:
                                                                        '2.5%',
                                                                }}
                                                                setValue={change => {
                                                                    setState(
                                                                        prevState => {
                                                                            const temp =
                                                                                {
                                                                                    ...prevState,
                                                                                } as SignUpState
                                                                            temp.birthday =
                                                                                change
                                                                            return temp
                                                                        }
                                                                    )
                                                                }}
                                                                maxLength={16}
                                                                value={
                                                                    (
                                                                        state as SignUpState
                                                                    ).birthday
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Text
                                                                bold
                                                                textAlign="left"
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                            >
                                                                Profile Picture
                                                            </Text>
                                                            <ProfilePicture
                                                                image={
                                                                    previewUrl ??
                                                                    '/Profile-picture.png'
                                                                }
                                                            />
                                                            <Input
                                                                type="file"
                                                                placeholder="Profile Picture"
                                                                setValue={
                                                                    setProfilePicture
                                                                }
                                                            />
                                                            <Input
                                                                placeholder="Bio"
                                                                type="text"
                                                                style={{
                                                                    marginTop:
                                                                        '2.5%',
                                                                }}
                                                                setValue={change => {
                                                                    setState(
                                                                        prevState => {
                                                                            const temp =
                                                                                {
                                                                                    ...prevState,
                                                                                } as SignUpState
                                                                            temp.bio =
                                                                                change
                                                                            return temp
                                                                        }
                                                                    )
                                                                }}
                                                            />
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                    <Button
                                        onClick={() =>
                                            signUpSlides.slide === 4
                                                ? clickSignUp()
                                                : setSignUpSlides(
                                                      prevState => ({
                                                          buttonActive:
                                                              prevState.slide ===
                                                              3,
                                                          slide:
                                                              prevState.slide +
                                                              1,
                                                      })
                                                  )
                                        }
                                        style={{
                                            marginTop: '2.5%',
                                        }}
                                        inactive={!signUpSlides.buttonActive}
                                        submit
                                    >
                                        {signUpSlides.slide === 4
                                            ? 'Sign Up'
                                            : 'Next'}
                                    </Button>
                                    {signUpSlides.slide !== 1 ? (
                                        <Button
                                            onClick={() => {
                                                setSignUpSlides(prevState => ({
                                                    buttonActive:
                                                        prevState.buttonActive,
                                                    slide: prevState.slide - 1,
                                                }))
                                                setDisplayErrorText([
                                                    { active: false },
                                                    { active: false },
                                                ])
                                            }}
                                            style={{
                                                marginTop: '2%',
                                            }}
                                        >
                                            Back
                                        </Button>
                                    ) : null}
                                </>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
