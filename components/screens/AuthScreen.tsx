import { FC } from 'react'
import { authProps } from '../../types/auth'

export const AuthScreen: FC<authProps> = ({ logIn }) => {
    if (logIn) return <div />
    return <div />
}
