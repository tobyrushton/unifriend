import { useState } from 'react'
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

    const createNotification: createNotificationType = (args): void => {
        setQueue(prevState => {
            prevState.enQueue(args)
            return prevState
        })

        setTimeout(() => {
            setQueue(prevState => {
                prevState.deQueue()
                return prevState
            })
        }, 10000)
    }

    return [queue.queue, createNotification]
}
