import React from 'react'
import { Settings, UniversityPreference } from './settings'
import { Color } from './colors'
import { UserObjectWithID } from './User'
import { MessageWithId } from './Messages'

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

export type UserProviderProps = ChildrenProps & {
    fetchedUser?: UserObjectWithID
    fetchedSettings?: Settings
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

export interface MessageContextInterface {
    messages: MessageWithId[]
    conversationId: string
    addMessage: (newMessage: MessageWithId) => void
}

export interface MessagingProviderProps extends ChildrenProps {
    userId: string
    conversationId: string
    fetchedMessages: MessageWithId[]
}
