import { FC, useState, useEffect } from 'react'
import { Text, Toggle, Input, Button } from '../ui'
import { useMutation } from '../../hooks/graphql/useMutation'
import {
    UpdateSettingsMutation,
    UpdateUserMutation,
} from '../../graphql/queries'
import {
    Settings,
    settingsUpdateObject,
    UniversityPreference,
    UserUpdateObject,
    UpdateUserReturn,
    UpdateUserParamaters,
    ErrorTextState,
} from '../../types'
import {
    useNotifications,
    useLoadingScreen,
    useUser,
    useCheckUsername,
} from '../../hooks'
import styles from '../../styles/modules/Settings.module.scss'

// updates colour theme
export const SlideOne: FC = () => {
    const [dark, setDark] = useState<boolean>(false) // implement default val later using useUser
    // implements a restraint so the mutation is only executed when it's meant to be
    const [exec, setExec] = useState<boolean>(false)
    const { success, loading, error, mutation } = useMutation<
        settingsUpdateObject,
        Settings
    >(UpdateSettingsMutation)
    const { createNotification } = useNotifications()
    const { setLoading } = useLoadingScreen()
    const { user } = useUser()

    useEffect(() => {
        if (exec) {
            mutation({ darkMode: dark, id: user.id })
            setExec(false)
        }
    }, [exec, dark, mutation, user.id, setExec])

    useEffect(() => {
        // creates a success notification on success
        if (success) {
            createNotification({
                type: 'success',
                content: 'Colour mode updated successfully',
            })
        }
    }, [success, createNotification, setExec])

    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

    useEffect(() => {
        // creates an error notification on error
        if (error) {
            createNotification({
                type: 'error',
                content: error.message,
            })
        }
    }, [error, createNotification, setExec])

    return (
        <>
            <Text header style={{ marginLeft: '10%', marginTop: '2rem' }}>
                Set colour theme
            </Text>
            <div className={styles.toggleContainer}>
                <Text>Light</Text>
                <Toggle
                    onCheck={change => {
                        setDark(change)
                        setExec(true)
                    }}
                />
                <Text>Dark</Text>
            </div>
        </>
    )
}

// updates uni preference
export const SlideTwo: FC = () => {
    // implement default val later using useUser
    const [preference, setPreference] = useState<UniversityPreference>('OWN')
    // implements a restraint so the mutation is only executed when it's meant to be
    const [exec, setExec] = useState<boolean>(false)
    const { success, loading, error, mutation } = useMutation<
        settingsUpdateObject,
        Settings
    >(UpdateSettingsMutation)
    const { createNotification } = useNotifications()
    const { setLoading } = useLoadingScreen()
    const { user } = useUser()

    useEffect(() => {
        if (exec) {
            mutation({ universityPreference: preference, id: user.id })
            setExec(false)
        }
    }, [exec, preference, mutation, user.id, setExec])

    useEffect(() => {
        // creates a success notification on success
        if (success) {
            createNotification({
                type: 'success',
                content: 'University preference updated successfully',
            })
        }
    }, [success, createNotification, setExec])

    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

    useEffect(() => {
        // creates an error notification on error
        if (error) {
            createNotification({
                type: 'error',
                content: error.message,
            })
        }
    }, [error, createNotification, setExec])

    return (
        <>
            <Text header style={{ marginLeft: '10%', marginTop: '2rem' }}>
                Set university preference
            </Text>
            <div className={styles.toggleContainer}>
                <Text>Own university only</Text>
                <Toggle
                    onCheck={change => {
                        setPreference(change ? 'ALL' : 'OWN')
                        setExec(true)
                    }}
                />
                <Text>All UK universities</Text>
            </div>
        </>
    )
}

// updates account info
export const SlideThree: FC = () => {
    const [state, setState] = useState<UserUpdateObject>()
    const [exec, setExec] = useState<boolean>(false)
    // ensures that the user cannot call requests infintely
    const [buttonInactive, setButtonInactive] = useState<boolean>(true)
    const [errorText, setErrorText] = useState<ErrorTextState[]>([
        { active: false },
        { active: false },
    ])
    const { loading, success, error, mutation } = useMutation<
        UpdateUserParamaters,
        UpdateUserReturn
    >(UpdateUserMutation)
    const { user } = useUser()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()
    const {
        data,
        loading: checkUsernameLoading,
        runQuery: checkUsername,
    } = useCheckUsername()

    useEffect(() => {
        // when the mutation or query is loading, the button is disabled
        setLoading(loading || checkUsernameLoading)
        setButtonInactive(loading || checkUsernameLoading)
    }, [loading, checkUsernameLoading, setLoading, setButtonInactive])

    useEffect(() => {
        if (state?.course) {
            if (state.course.length < 3) {
                setErrorText(prevState => {
                    const temp = [...prevState]
                    temp[1] = {
                        active: true,
                        content: 'Course length be atleast three characters',
                    }
                    return temp
                })
                setButtonInactive(true)
            } else {
                setErrorText(prevState => {
                    const temp = [...prevState]
                    temp[1] = { active: false }
                    return temp
                })
                setButtonInactive(false)
            }
        }
    }, [state?.course, setButtonInactive, setErrorText])

    useEffect(() => {
        if (data) {
            if (data.result) {
                setErrorText(prevState => {
                    const temp = [...prevState]
                    temp[0] = { active: true, content: 'Username is taken' }
                    return temp
                })
                setButtonInactive(true)
            } else {
                setErrorText(prevState => {
                    const temp = [...prevState]
                    temp[0] = { active: false }
                    return temp
                })
                setButtonInactive(false)
            }
        }
    }, [data, setErrorText, setButtonInactive])

    useEffect(() => {
        if (state?.username) {
            if (state.username !== user.username)
                checkUsername({ username: state.username })
        }
    }, [state, user, checkUsername])

    useEffect(() => {
        // creates a success notification on success
        if (success && !loading) {
            createNotification({
                type: 'success',
                content: 'Account details updated successfully',
            })
        }
    }, [success, loading, createNotification])

    useEffect(() => {
        if (error) {
            // creates an error notification on error
            createNotification({
                type: 'error',
                content: error.message,
            })
        }
    }, [error, createNotification])

    useEffect(() => {
        if (exec) {
            mutation({ id: user.id, ...state })
            setExec(false)
        }
    }, [exec, state, user, mutation, setExec])

    return (
        <>
            <Text header bold textAlign="center">
                Update account information
            </Text>
            <div className={styles.inputContainer}>
                <Text bold>Name</Text>
                <Input
                    placeholder="First Name"
                    type="text"
                    setValue={val =>
                        setState(prevState => {
                            const temp = { ...prevState }
                            temp.firstName = val
                            return temp
                        })
                    }
                    value={state?.firstName ?? user.firstName}
                    maxLength={16}
                />
                <Input
                    placeholder="Last Name"
                    type="text"
                    setValue={val =>
                        setState(prevState => {
                            const temp = { ...prevState }
                            temp.lastName = val
                            return temp
                        })
                    }
                    value={state?.lastName ?? user.lastName}
                    maxLength={16}
                />
                <Text bold style={{ marginTop: '5%' }}>
                    Username
                </Text>
                <Input
                    placeholder="username"
                    type="text"
                    setValue={val =>
                        setState(prevState => {
                            const temp = { ...prevState }
                            temp.username = val
                            return temp
                        })
                    }
                    value={state?.username ?? user.username}
                    maxLength={16}
                />
                {errorText[0].active ? (
                    <Text color="error" small>
                        {errorText[0].content}
                    </Text>
                ) : null}
                <Text bold style={{ marginTop: '5%' }}>
                    Course
                </Text>
                <Input
                    placeholder="Course"
                    type="text"
                    setValue={val =>
                        setState(prevState => {
                            const temp = { ...prevState }
                            temp.course = val
                            return temp
                        })
                    }
                    value={state?.course ?? user.course}
                    maxLength={32}
                />
                {errorText[1].active ? (
                    <Text color="error" small>
                        {errorText[1].content}
                    </Text>
                ) : null}
                <Text bold style={{ marginTop: '5%' }}>
                    Bio
                </Text>
                <Input
                    placeholder="Bio"
                    type="text"
                    setValue={val =>
                        setState(prevState => {
                            const temp = { ...prevState }
                            temp.bio = val
                            return temp
                        })
                    }
                    value={state?.bio ?? user.bio}
                    maxLength={256}
                />
                <Button
                    onClick={() => setExec(true)}
                    inactive={buttonInactive}
                    filled
                >
                    Update
                </Button>
            </div>
        </>
    )
}

// deletes account
export const SlideFour: FC = () => {
    return <div />
}
