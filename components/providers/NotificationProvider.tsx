import { createContext, FC, useMemo } from 'react'
import { ChildrenProps, NotificationContextInterface } from '../../types'
import { useNotificationQueue } from '../../hooks/providers/useNotificationQueue'
import { Notification } from '../ui'
import styles from '../../styles/modules/UI.module.scss'

export const NotificationContext =
    createContext<NotificationContextInterface | null>(null)

export const NotificationProvider: FC<ChildrenProps> = ({ children }) => {
    const [notifications, createNotification, deleteNotification] =
        useNotificationQueue()

    const ProviderValue: NotificationContextInterface = useMemo(
        () => ({
            createNotification,
        }),
        [createNotification]
    )

    return (
        <NotificationContext.Provider value={ProviderValue}>
            <div className={styles.notificationContainer}>
                {notifications.map((notification, idx) =>
                    notification ? (
                        <Notification
                            type={notification.type}
                            content={notification.content}
                            key={'notification'.concat(idx.toString())}
                            onClick={() => deleteNotification(idx)}
                        />
                    ) : null
                )}
            </div>
            {children}
        </NotificationContext.Provider>
    )
}
