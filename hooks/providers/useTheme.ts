import { useContext } from 'react'
import { ThemeContext } from '../../components/providers/ThemeProvider'
import { ThemeContextInterface } from '../../types'

export const useTheme = (): ThemeContextInterface =>
    useContext(ThemeContext) as ThemeContextInterface
