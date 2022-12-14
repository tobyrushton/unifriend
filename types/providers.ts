import React from 'react'
import { Settings, UniversityPreference } from './settings'
import { Color } from './colors'
import { UserObjectWithID } from './User'

export interface UpdateSettingsArgs {
    darkMode?: boolean
    universityPreference?: UniversityPreference
}
export interface UserContextInterface {
    user: UserObjectWithID
    settings: Settings
    updateSettings: (args: UpdateSettingsArgs) => void
    resetPassword: (password: string) => Promise<void>
}

export type ChildrenProps = {
    children: React.ReactNode
}

export interface LoadingContextInterface {
    setLoading: (change: boolean) => void
}

export type NotificationType = 'error' | 'success' | 'standard'

export interface NotificationInterface {
    type: NotificationType
    content: string
}

export type createNotificationType = (args: NotificationInterface) => void

export interface NotificationContextInterface {
    createNotification: createNotificationType
}

export interface ThemeContextInterface {
    theme: Record<Color, string>
}
