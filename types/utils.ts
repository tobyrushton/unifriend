import { ChildrenProps } from './providers'
type color = 'primary' | 'secondary'

export interface LogoProps {
    color: color
}

export interface TextProps extends ChildrenProps {
    bold?: boolean
    header?: boolean
}