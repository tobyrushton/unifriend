import { RefObject } from 'react'
import { DocumentNode } from 'graphql'
import { ChildrenProps, NotificationInterface } from './providers'
import { Color } from './colors'

type TextAlign = 'left' | 'center' | 'right'

type StyleProperties = {
    marginTop?: string
    marginBottom?: string
    marginLeft?: string
    marginRight?: string
    margin?: string
    color?: string
    width?: string
    height?: string
}

export interface LogoProps {
    color: Color
    style?: StyleProperties
}

export interface TextProps extends ChildrenProps {
    bold?: boolean
    header?: boolean
    style?: StyleProperties
    large?: boolean
    small?: boolean
    clickable?: boolean
    color?: Color
    onClick?: () => void
    textAlign?: TextAlign
}

export interface ButtonProps extends ChildrenProps {
    onClick: () => void
    submit?: boolean
    filled?: boolean
    inactive?: boolean
    style?: StyleProperties
}

export type InputType = 'password' | 'text' | 'date'

export type InputProps =
    | {
          placeholder: string
          type: InputType
          setValue: (update: string) => void
          value?: string | undefined
          style?: StyleProperties
          maxLength?: number
      }
    | {
          placeholder: string
          type: 'file'
          setValue: (update: File) => void
          value?: string | undefined
          style?: StyleProperties
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
    style?: StyleProperties
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
    style?: StyleProperties
    value?: boolean
}

export type MutationButtonProps<_Return, Params> = ChildrenProps &
    ButtonProps & {
        args: Params
        mutation: DocumentNode
        successMessage: string
    }
