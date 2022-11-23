import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    authProps,
    logInState,
    signUpState,
    signUpSlidesInterface,
    createUserObject,
    createUserObjectWithUniversity,
} from '../../types'
import styles from '../../styles/modules/Authentication.module.scss'
import { Input, Text, Button, Exit } from '../ui'
import { ConfirmEmailScreen } from './ConfirmEmailScreen'
import {
    useLogIn,
    useNotifications,
    useSignUp,
    useCreateUser,
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

export const AuthScreen: FC<authProps> = ({ logIn, signUp, changeAuth }) => {
    const [state, setState] = useState<logInState | signUpState>()
    const [buttonActive, setButtonActive] = useState<boolean>(false)
    const [signUpSlides, setSignUpSlides] = useState<signUpSlidesInterface>({
        buttonActive: false,
        slide: 1,
    })
    const [displayConfirmEmail, setDisplayConfirmEmail] =
        useState<boolean>(false)
    const [displayForgottenPassword, setDisplayForgottenPassword] =
        useState<boolean>(false)

    const {
        response: signIn,
        error: signInError,
        loading: signInLoading,
    } = useLogIn()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()
    const {
        response: register,
        error: signUpError,
        loading: signUpLoading,
    } = useSignUp()
    const {
        mutation: createUser,
        success: createUserSuccess,
        loading: createUserLoading,
        error: createUserError,
    } = useCreateUser()
    const router = useRouter()

    useEffect(() => {
        setLoading(signInLoading || signUpLoading || createUserLoading)
    }, [signInLoading, setLoading, signUpLoading, createUserLoading])

    useEffect(() => {
        if (signInError) {
            if (signInError.message === 'Email not confirmed')
                setDisplayConfirmEmail(true)
            else
                createNotification({
                    type: 'error',
                    content: signInError.message as string,
                })
        }
    }, [signInError, createNotification])

    useEffect(() => {
        if (signUpError)
            createNotification({
                type: 'error',
                content: signUpError.message as string,
            })
    }, [signUpError, createNotification])

    useEffect(() => {
        if (createUserError)
            createNotification({
                type: 'error',
                content: createUserError.message as string,
            })
    }, [createUserError, createNotification])

    useEffect(() => {
        if (logIn && state === undefined) setState({ email: '', password: '' })
        if (signUp && state === undefined)
            setState({
                firstName: '',
                lastName: '',
                birthday: '',
                email: '',
                username: '',
                course: '',
                password: '',
            })
        if (state) {
            if (logIn) {
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
                    setSignUpSlides(prevState => {
                        const temp = { ...prevState }
                        temp.buttonActive = true
                        return temp
                    })
                else
                    setSignUpSlides(prevState => {
                        const temp = { ...prevState }
                        temp.buttonActive = false
                        return temp
                    })
            } else if (signUpSlides.slide === 2) {
                if (
                    isValidPassword(state.password) &&
                    isValidUsername(state.username)
                )
                    setSignUpSlides(prevState => {
                        const temp = { ...prevState }
                        temp.buttonActive = true
                        return temp
                    })
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
    ])

    const clickSignIn = async (): Promise<void> => {
        if (!isSignUpState(state) && state) {
            await signIn(state.email, state.password)
        }
    }

    const clickSignUp = async (): Promise<void> => {
        if (isSignUpState(state)) {
            const university = getUniversity(state.email)
            if (university !== null) {
                await register(state.email, state.password)
                if (signUpError === null) {
                    const temp: Partial<Pick<signUpState, 'password'>> &
                        Omit<signUpState, 'password'> = state
                    delete temp.password
                    const CreateUserObject: createUserObjectWithUniversity = {
                        ...(temp as createUserObject),
                        ...({ university } as {
                            university: string
                        }),
                    }

                    await createUser(CreateUserObject)
                    if (createUserError === undefined)
                        createNotification({
                            type: 'success',
                            content: 'Account created successfully.',
                        })
                    if (createUserSuccess) {
                        router.push('/a')
                    }
                }
            } else
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
                                                } as logInState
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
                                                } as logInState
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
                                                        } as signUpState
                                                        temp.firstName = change
                                                        return temp
                                                    })
                                                }}
                                                style={{
                                                    marginTop: '2.5%',
                                                }}
                                                maxLength={16}
                                            />
                                            <Input
                                                placeholder="Last Name"
                                                type="text"
                                                setValue={change => {
                                                    setState(prevState => {
                                                        const temp = {
                                                            ...prevState,
                                                        } as signUpState
                                                        temp.lastName = change
                                                        return temp
                                                    })
                                                }}
                                                style={{
                                                    marginTop: '2.5%',
                                                }}
                                                maxLength={16}
                                            />
                                            <Input
                                                placeholder="University Email"
                                                type="text"
                                                setValue={change => {
                                                    setState(prevState => {
                                                        const temp = {
                                                            ...prevState,
                                                        } as signUpState
                                                        temp.email = change
                                                        return temp
                                                    })
                                                }}
                                                style={{
                                                    marginTop: '2.5%',
                                                }}
                                                maxLength={32}
                                            />
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
                                                                        } as signUpState
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
                                                    />
                                                    <Input
                                                        placeholder="Password"
                                                        type="password"
                                                        setValue={change => {
                                                            setState(
                                                                prevState => {
                                                                    const temp =
                                                                        {
                                                                            ...prevState,
                                                                        } as signUpState
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
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Input
                                                        placeholder="Course"
                                                        type="text"
                                                        style={{
                                                            marginTop: '2.5%',
                                                        }}
                                                        setValue={change => {
                                                            setState(
                                                                prevState => {
                                                                    const temp =
                                                                        {
                                                                            ...prevState,
                                                                        } as signUpState
                                                                    temp.course =
                                                                        change
                                                                    return temp
                                                                }
                                                            )
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder="Birthday"
                                                        type="date"
                                                        style={{
                                                            marginTop: '2.5%',
                                                        }}
                                                        setValue={change => {
                                                            setState(
                                                                prevState => {
                                                                    const temp =
                                                                        {
                                                                            ...prevState,
                                                                        } as signUpState
                                                                    temp.birthday =
                                                                        change
                                                                    return temp
                                                                }
                                                            )
                                                        }}
                                                        maxLength={16}
                                                    />
                                                </>
                                            )}
                                        </>
                                    )}
                                    <Button
                                        onClick={() =>
                                            signUpSlides.slide === 3
                                                ? clickSignUp()
                                                : setSignUpSlides(
                                                      prevState => ({
                                                          buttonActive: false,
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
                                    >
                                        {signUpSlides.slide === 3
                                            ? 'Sign Up'
                                            : 'Next'}
                                    </Button>
                                </>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
