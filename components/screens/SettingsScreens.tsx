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
} from '../../types'
import { useNotifications, useLoadingScreen, useUser } from '../../hooks'
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
        if (exec) mutation({ darkMode: dark, id: user.id })
    }, [exec, dark, mutation, user.id])

    useEffect(() => {
        // creates a success notification on success
        if (success) {
            createNotification({
                type: 'success',
                content: 'Colour mode updated successfully',
            })
            setExec(false)
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
            setExec(false)
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
        if (exec) mutation({ universityPreference: preference, id: user.id })
    }, [exec, preference, mutation, user.id])

    useEffect(() => {
        // creates a success notification on success
        if (success) {
            createNotification({
                type: 'success',
                content: 'University preference updated successfully',
            })
            setExec(false)
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
            setExec(false)
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
    const { loading, success, error, mutation } = useMutation<
        UpdateUserParamaters,
        UpdateUserReturn
    >(UpdateUserMutation)
    const { user } = useUser()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()

    useEffect(() => {
        // when the mutation is loading, the button is disabled
        setLoading(loading)
        setButtonInactive(loading)
    }, [loading, setLoading, setButtonInactive])

    useEffect(() => {
        // creates a success notification on success
        if (success) {
            createNotification({
                type: 'success',
                content: 'Account details updated successfully',
            })
        }
    }, [success, createNotification])

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
        if (exec) mutation({ id: user.id, ...state })
    }, [exec, state, user, mutation])

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
                    value={user.firstName}
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
                    value={user.lastName}
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
                    value={user.username}
                />
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
                    value={user.course}
                />
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
                    value={user.bio}
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
