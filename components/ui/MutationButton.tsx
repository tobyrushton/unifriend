'use client'

import { ReactElement, useEffect } from 'react'
import { Button } from './Button'
import { useMutation, useLoadingScreen, useNotifications } from '../../hooks'
import { MutationButtonProps } from '../../types'

export const MutationButton = <TReturn, TParams>({
    children,
    mutation,
    args,
    successMessage,
    style,
    inactive,
    filled,
}: MutationButtonProps<TReturn, TParams>): ReactElement => {
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()
    const { loading, mutation: runMutation } = useMutation()

    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

    const handleMutation = async (): Promise<void> => {
        const { error, success } = await runMutation<TReturn, TParams>({
            mutation,
            ...args,
        })
        if (success)
            createNotification({ type: 'success', content: successMessage })
        else if (error)
            error.forEach(e =>
                createNotification({ type: 'error', content: e.message })
            )
    }

    return (
        <Button
            onClick={handleMutation}
            style={style}
            inactive={inactive}
            filled={filled}
        >
            {children}
        </Button>
    )
}
