import { createContext, FC, useMemo } from 'react'
import { ChildrenProps, NotificationContextInterfrace } from '../../types'
import { useNotificationQueue } from '../../hooks'
import { Notification } from '../ui'
import styles from '../../styles/modules/UI.module.scss'

export const NotificationContext =
    createContext<NotificationContextInterfrace | null>(null)

export const NoticiationProvider: FC<ChildrenProps> = ({ children }) => {
    const [notifications, createNotification, deleteNotification] = useNotificationQueue()

    const ProviderValue: NotificationContextInterfrace = useMemo(
        () => ({
            createNotification,
        }),
        [createNotification]
    )

    return (
        <NotificationContext.Provider value={ProviderValue}>
            <div className={styles.notificationContainer}>
                {notifications.map((notification, idx) => notification? (
                    <Notification
                        type={notification.type}
                        content={notification.content}
                        key={'notification'.concat(idx.toString())}
                        onClick={() => deleteNotification(idx)}
                    />
                ): null)}
            </div>
            {children}
        </NotificationContext.Provider>
    )
}
