import { FC, useState, useEffect } from 'react'
import { authProps, logInState, signUpState } from '../../types/auth'
import styles from '../../styles/modules/Authentication.module.scss'
import { Input, Text, Button } from '../ui'
import { useLogIn } from '../../hooks'
import { useLoadingScreen } from '../../hooks/providers/useLoadingScreen'
import { isSignUpState } from '../../lib/utils'

export const AuthScreen: FC<authProps> = ({ logIn, signUp, changeAuth }) => {
    const [state, setState] = useState<logInState | signUpState>()
    const [buttonActive, setButtonActive] = useState<boolean>(false)

    const {
        response: signIn,
        error: signInError,
        loading: signInLoading,
    } = useLogIn()
    const { setLoading } = useLoadingScreen()

    useEffect(() => {
        setLoading(signInLoading)
    }, [signInLoading, setLoading])

    useEffect(() => {
        console.log(signInError?.message)
    }, [signInError])

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
    }, [state, logIn, signUp])

    useEffect(() => {
        if (state) {
            if (logIn) {
                if (state.password.length >= 8 && state.email.length >= 3) {
                    setButtonActive(true)
                } else setButtonActive(false)
            }
        }
    }, [logIn, state, state?.password, state?.email])

    const clickSignIn = async (): Promise<void> => {
        if (!isSignUpState(state) && state) {
            await signIn(state.email, state.password)
            // logic to handle errors here etc.
        }
    }

    return (
        <div className={styles.fazedOut}>
            <div className={styles.authContainer}>
                <div
                    className={styles.exit}
                    onClick={() => changeAuth({ active: false })}
                    tabIndex={0}
                    role="button"
                >
                    <div />
                    <div />
                </div>
                <div className={styles.offset}>
                    {logIn ? (
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
                        <div />
                    )}
                </div>
            </div>
        </div>
    )
}
