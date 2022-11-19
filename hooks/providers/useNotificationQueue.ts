import { useState, useMemo } from 'react'
import { Queue } from '../../lib/utils'
import {
    NotificationInterface,
    createNotificationType,
    notificationQueueReturn,
} from '../../types'

export const useNotificationQueue = (): notificationQueueReturn => {
    const [queue, setQueue] = useState<Queue<NotificationInterface>>(
        () => new Queue(20)
    )

    const createNotification: createNotificationType = useMemo(
        () =>
            (args): void => {
                setQueue(prevState => {
                    const temp = { ...prevState }
                    temp.enQueue(args)
                    return temp as Queue<NotificationInterface>
                })

                setTimeout(() => {
                    setQueue(prevState => {
                        const temp = { ...prevState }
                        temp.deQueue()
                        return temp as Queue<NotificationInterface>
                    })
                }, 10000)
            },
        []
    )

    const deleteNotification = (idx: number): void => {
        setQueue(prevState => {
            const temp = { ...prevState }
            temp.deQueueSpecific(idx)
            return temp as Queue<NotificationInterface>
        })
    }

    return [queue.queue, createNotification, deleteNotification]
}
