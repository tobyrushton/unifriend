import { createContext, FC, useState, useMemo } from 'react'
import { LoadingContextInterface, ChildrenProps } from '../../types'
import { LoadingScreen } from '../screens/LoadingScreen'

export const LoadingContext = createContext<LoadingContextInterface | null>(
    null
)

export const LoadingProvider: FC<ChildrenProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false)

    const ProviderValue: LoadingContextInterface = useMemo(
        () => ({
            setLoading,
        }),
        [setLoading]
    )

    return (
        <LoadingContext.Provider value={ProviderValue}>
            {loading ? <LoadingScreen /> : null}
            {children}
        </LoadingContext.Provider>
    )
}
