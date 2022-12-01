import { useMutation } from '@apollo/client'
import { useState } from 'react'
import {
    graphQLHookReturnMutation,
    settingsUpdateObject,
    Settings,
} from '../../../types/index'
import { UpdateSettingsMutation } from '../../../graphql/queries'

export const useUpdateSettings = (): graphQLHookReturnMutation<
    settingsUpdateObject,
    Settings
> => {
    // defines state types which allow for dynamic return values
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const [success, setSuccess] = useState<boolean>(false)

    // creates a function thas uses the graphql mutation previously defined to update settings
    const [updateSettings] = useMutation<Settings, settingsUpdateObject>(
        UpdateSettingsMutation,
        {
            onError: err => {
                // updates state on error
                setError(err)
                setSuccess(false)
                setLoading(false)
            },
            onCompleted: () => {
                // updates state on completion
                setSuccess(true)
                setLoading(false)
            },
        }
    )

    const mutation = async (args: settingsUpdateObject): Promise<Settings> => {
        setLoading(true)
        return (await updateSettings({ variables: args })) as Settings
    }

    return {
        success,
        loading,
        error,
        mutation,
    } as const
}
