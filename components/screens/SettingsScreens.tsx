import { FC, useState, useEffect } from 'react'
import { Text, Toggle, Input, Button } from '../ui'
import {
    UpdateSettingsMutation,
    UpdateUserMutation,
    CheckUsernameIsTakenQuery,
} from '../../graphql/queries'
import {
    Settings,
    settingsUpdateObject,
    UniversityPreference,
    UserUpdateObject,
    UpdateUserReturn,
    UpdateUserParamaters,
    ErrorTextState,
    CheckUsernameArgs,
    CheckUsernameIsTaken,
} from '../../types'
import {
    useNotifications,
    useLoadingScreen,
    useUser,
    useQuery,
    useMutation,
} from '../../hooks'
import styles from '../../styles/modules/Settings.module.scss'

// updates colour theme
export const SlideOne: FC = () => {
    const [dark, setDark] = useState<boolean>(false) // implement default val later using useUser
    // implements a restraint so the mutation is only executed when it's meant to be
    const [exec, setExec] = useState<boolean>(false)
    // const { success, loading, error, mutation } = useMutation<
    //     settingsUpdateObject,
    //     Settings
    // >(UpdateSettingsMutation)
    const { loading, mutation } = useMutation()
    const { createNotification } = useNotifications()
    const { setLoading } = useLoadingScreen()
    const { user } = useUser()

    useEffect(() => {
        // function to run the update settings mutation
        const run = async (): Promise<void> => {
            const { success, error } = await mutation<
                Settings,
                settingsUpdateObject
            >({ mutation: UpdateSettingsMutation, darkMode: dark, id: user.id })
            if (success)
                // creates success notification if successful
                createNotification({
                    type: 'success',
                    content: 'Colour mode updated successfully',
                })
            else if (error)
                // creates error notification for errors
                error.forEach(err =>
                    createNotification({
                        type: 'error',
                        content: err.message,
                    })
                )
        }
        if (exec) {
            run()
            setExec(false)
        }
    }, [exec, dark, mutation, user.id, setExec, createNotification])

    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

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
    const { loading, mutation } = useMutation()
    const { createNotification } = useNotifications()
    const { setLoading } = useLoadingScreen()
    const { user } = useUser()

    useEffect(() => {
        // function to run the update settings mutation
        const run = async (): Promise<void> => {
            const { success, error } = await mutation<
                Settings,
                settingsUpdateObject
            >({
                mutation: UpdateSettingsMutation,
                universityPreference: preference,
                id: user.id,
            })
            if (success)
                // creates success notification if successful
                createNotification({
                    type: 'success',
                    content: 'Colour mode updated successfully',
                })
            else if (error)
                // creates error notification for errors
                error.forEach(err =>
                    createNotification({
                        type: 'error',
                        content: err.message,
                    })
                )
        }
        if (exec) {
            run()
            setExec(false)
        }
    }, [exec, preference, mutation, user.id, setExec, createNotification])

    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

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
    const { loading: mutationLoading, mutation } = useMutation()
    const { user } = useUser()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()
    const { loading: queryLoading, query } = useQuery()

    useEffect(() => {
        // when the mutation or query is loading, the button is disabled
        setLoading(queryLoading || mutationLoading)
        setButtonInactive(queryLoading || mutationLoading)
    }, [queryLoading, mutationLoading, setLoading, setButtonInactive])

    useEffect(() => {
        if (state?.course) {
            // ensures that the length of the course inputted is 3 characters or more
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
        // fucntion to run the check username query
        const run = async (): Promise<void> => {
            if (state?.username) {
                const { data, error } = await query<
                    CheckUsernameIsTaken<boolean>,
                    CheckUsernameArgs
                >({
                    query: CheckUsernameIsTakenQuery,
                    username: state.username,
                })
                if (error)
                    // creates error notification on error
                    createNotification({
                        type: 'error',
                        content: error.message,
                    })
                else if (data && !data.CheckUsernameIsTaken) {
                    setErrorText(prevState => {
                        const temp = [...prevState]
                        temp[0] = { active: true, content: 'Username is taken' }
                        return temp
                    })
                }
                setButtonInactive(false)
            } else setButtonInactive(true)
        }
        if (state?.username) {
            if (state.username !== user.username) run()
        }
    }, [state, user, createNotification, query])

    useEffect(() => {
        const run = async (): Promise<void> => {
            const { success, error } = await mutation<
                UpdateUserReturn,
                UpdateUserParamaters
            >({ mutation: UpdateUserMutation, id: user.id, ...state })
            if (success)
                createNotification({
                    type: 'success',
                    content: 'Account details updated successfully',
                })
            else if (error)
                error.forEach(err =>
                    createNotification({
                        type: 'error',
                        content: err.message,
                    })
                )
        }
        if (exec) {
            run()
            setExec(false)
        }
    }, [exec, state, user, mutation, setExec, createNotification])

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
