import { ChildrenProps, NotificationInterface } from './providers'

export type color = 'primary' | 'secondary' | 'error' | 'success'

export interface LogoProps {
    color: color
}

type textAlign = 'left' | 'center' | 'right'

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
    large?: boolean
    small?: boolean
    clickable?: boolean
    color?: color
    onClick?: () => void
    textAlign?: textAlign
}

export interface ButtonProps extends ChildrenProps {
    onClick: () => void
    filled?: boolean
    inactive?: boolean
    style?: styleProperties
}

export type inputType = 'password' | 'text' | 'date'

export interface inputProps {
    placeholder: string
    type: inputType
    setValue: (update: string) => void
    value?: string | undefined
    style?: styleProperties
    maxLength?: number
}

export interface exitProps {
    onClick: () => void
}

export interface notificationProps extends NotificationInterface {
    onClick: () => void
}

export interface signUpSlidesInterface {
    buttonActive: boolean
    slide: number
}

export interface NavbarProps {
    hidden?: boolean
}
