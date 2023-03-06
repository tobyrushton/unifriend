export type Color =
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'accent'
    | 'text'
    | 'secondaryText'
    | 'background'
    | 'inactive'

export type Theme = 'dark' | 'light'

export type ColorsWithTheme = {
    dark: Record<Color, string>
    light: Record<Color, string>
}
