'use client'

import { FC, createContext, useState, useMemo, useEffect } from 'react'
import { ThemeContextInterface, Color, ChildrenProps } from '../../types'
import { colors } from '../../styles/reusables/colors'
import { useUser } from '../../hooks/providers/useUser'

export const ThemeContext = createContext<ThemeContextInterface | null>(null)

export const ThemeProvider: FC<ChildrenProps> = ({ children }) => {
    const [theme, setTheme] = useState<Record<Color, string>>(colors.light)

    const { settings } = useUser()

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            settings.darkMode ? 'dark' : 'light'
        )

        setTheme(settings.darkMode ? colors.dark : colors.light)
    }, [settings.darkMode])

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
