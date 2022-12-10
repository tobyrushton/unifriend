import { RefObject } from 'react'
import { ChildrenProps, NotificationInterface } from './providers'

export type color = 'primary' | 'secondary' | 'error' | 'success'

type textAlign = 'left' | 'center' | 'right'

type styleProperties = {
    marginTop?: string
    marginBottom?: string
    marginLeft?: string
    marginRight?: string
    margin?: string
}

export interface LogoProps {
    color: color
    style?: styleProperties
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
    submit?: boolean
    filled?: boolean
    inactive?: boolean
    style?: styleProperties
}

export type inputType = 'password' | 'text' | 'date'

export type InputProps =
    | {
          placeholder: string
          type: inputType
          setValue: (update: string) => void
          value?: string | undefined
          style?: styleProperties
          maxLength?: number
      }
    | {
          placeholder: string
          type: 'file'
          setValue: (update: File) => void
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

export interface ProfilePictureProps {
    width?: number
    height?: number
    style?: styleProperties
    image: string
}

export interface DropDownProps {
    handleClickOutside: (
        event: MouseEvent,
        containerRef: RefObject<HTMLDivElement>
    ) => void
}

export interface ToggleProps {
    onCheck: (change: boolean) => void
    style?: styleProperties
    value?: boolean
}
