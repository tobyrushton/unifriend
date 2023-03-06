import { FC } from 'react'
import { ChildrenProps } from '../../types'
import {
    NotificationProvider,
    LoadingProvider,
    UserProvider,
    ThemeProvider,
} from '../../components'

export const ProviderStack: FC<ChildrenProps> = ({ children }) => {
    return (
        <LoadingProvider>
            <NotificationProvider>
                <UserProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </UserProvider>
            </NotificationProvider>
        </LoadingProvider>
    )
}
