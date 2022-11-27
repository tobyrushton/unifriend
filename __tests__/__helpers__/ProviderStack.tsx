import { FC } from 'react'
import { ChildrenProps } from '../../types'
import {
    NotificationProvider,
    LoadingProvider,
    UserProvider,
} from '../../components'

export const ProviderStack: FC<ChildrenProps> = ({ children }) => {
    return (
        <LoadingProvider>
            <NotificationProvider>
                <UserProvider>{children}</UserProvider>
            </NotificationProvider>
        </LoadingProvider>
    )
}
