import { ColorsWithTheme } from '../../types'

// allows for the use of color variables using inline styles.
// export const colors: Record<color, string> = {
//     primary: '#1976D2',
//     secondary: 'white',
//     error: '#ff3333',
//     success: '#22C55E',
// }

// allows for the use of color variables using inline styles.
export const colors: ColorsWithTheme = {
    dark: {
        primary: '#1976D2',
        secondary: '#404040',
        accent: '#282828',
        text: 'white',
        secondaryText: 'white',
        background: '#121212',
        inactive: '#D9D9D9',
        error: '#ff3333',
        success: '#22C55E',
    },
    light: {
        primary: '#1976D2',
        secondary: 'white',
        accent: '#E6E6E6',
        text: 'black',
        secondaryText: 'white',
        background: 'white',
        inactive: '#D9D9D9',
        error: '#ff3333',
        success: '#22C55E',
    },
}
