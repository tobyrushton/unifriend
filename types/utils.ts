import { ChildrenProps } from './providers'

type color = 'primary' | 'secondary'

export interface LogoProps {
    color: color
}

type styleProperties = {
    marginTop?: string
    marginBottom?: string
    marginLeft?: string
    marginRight?: string
    margin?: string
}

export interface TextProps extends ChildrenProps {
    bold?: boolean
    header?: boolean
    style?: styleProperties
}

export interface ButtonProps extends ChildrenProps {
    onClick: () => void
    filled?: boolean
    inactive?: boolean
    style?: styleProperties
}

export type inputType = 'password' | 'text'

export interface inputProps {
    placeholder: string
    type: inputType
    setValue: (update: string) => void
    value?: string | undefined
    style?: styleProperties
    maxLength?: number
}
