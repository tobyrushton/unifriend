import { FC, createContext, useState, useMemo, useEffect } from 'react'
import { ThemeContextInterface, Color, ChildrenProps } from '../../types'
import { colors } from '../../styles/reusables/colors'

export const ThemeContext = createContext<ThemeContextInterface | null>(null)

export const ThemeProvider: FC<ChildrenProps> = ({ children }) => {
    const [theme, setTheme] = useState<Record<Color, string>>(colors.light)

    const getTheme =
        typeof window === 'undefined'
            ? 'light'
            : document.documentElement.getAttribute('data-theme')

    useEffect(() => {
        setTheme(getTheme === 'dark' ? colors.dark : colors.light)
    }, [getTheme])

    const ProviderValue: ThemeContextInterface = useMemo(
        () => ({
            theme,
        }),
        [theme]
    )

    return (
        <ThemeContext.Provider value={ProviderValue}>
            {children}
        </ThemeContext.Provider>
    )
}
