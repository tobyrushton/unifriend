import { FC, createContext, useState, useMemo, useEffect } from 'react'
import { ChildrenProps, ThemeContextInterface, Color } from '../../types'
import { useUser } from '../../hooks/providers/useUser'
import { colors } from '../../styles/reusables/colors'

export const ThemeContext = createContext<ThemeContextInterface | null>(null)

export const ThemeProvider: FC<ChildrenProps> = ({ children }) => {
    const [theme, setTheme] = useState<Record<Color, string>>(colors.light)

    const { settings } = useUser()

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            settings.darkMode ? 'dark' : 'light'
        )

        if (settings.darkMode) setTheme(colors.dark)
        else setTheme(colors.light)
    }, [settings])

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
