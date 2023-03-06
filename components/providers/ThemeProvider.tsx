'use client'

import { FC, createContext, useState, useMemo, useEffect } from 'react'
import Cookies from 'js-cookie'
import { ThemeContextInterface, Color, ChildrenProps, Theme } from '../../types'
import { colors } from '../../styles/reusables/colors'
import { useUser } from '../../hooks/providers/useUser'

export const ThemeContext = createContext<ThemeContextInterface | null>(null)

export const ThemeProvider: FC<ChildrenProps> = ({ children }) => {
    const [theme, setTheme] = useState<Record<Color, string>>(colors.light)

    const { settings } = useUser()

    useEffect(() => {
        // sets the theme to the users preference
        const themeType: Theme = settings.darkMode ? 'dark' : 'light'

        // sets the theme
        setTheme(settings.darkMode ? colors.dark : colors.light)

        // sets the theme in a cookie
        Cookies.set('theme', themeType, {
            expires: new Date().setFullYear(new Date().getFullYear() + 1),
        })

        // sets the theme in the html
        document.documentElement.setAttribute('data-theme', themeType)
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
