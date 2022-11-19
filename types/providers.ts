import React from 'react'
import { UserObjectWithID } from './User'

export interface userContextInterface {
    user: UserObjectWithID
}

export type ChildrenProps = {
    children: React.ReactNode
}

export interface LoadingContextInterface {
    setLoading: (change: boolean) => void
}

export type notificationType = 'error' | 'success' | 'standard'

export interface NotificationInterface {
    type: notificationType
    content: string
}

export type createNotificationType = (args: NotificationInterface) => void

export interface NotificationContextInterface {
    createNotification: createNotificationType
}
