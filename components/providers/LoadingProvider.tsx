import { createContext, FC, useState, useMemo } from 'react'
import { LoadingContextInterface, ChildrenProps } from '../../types'
import { LoadingScreen } from '../screens/LoadingScreen'

// creates the context for the provider with the interface defined
export const LoadingContext = createContext<LoadingContextInterface | null>(
    null
)

export const LoadingProvider: FC<ChildrenProps> = ({ children }) => {
    // loading state that will decide whether to display the loading screen or not
    const [loading, setLoading] = useState<boolean>(false)

    // value that is passed down
    const ProviderValue: LoadingContextInterface = useMemo(
        // memoised
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
