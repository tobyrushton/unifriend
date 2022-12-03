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
    ) // creates state instance with the queueue, with max length of 20

    // function to create a notification
    const createNotification: createNotificationType = useMemo(
        // memoised
        () =>
            (args): void => {
                setQueue(prevState => {
                    const temp = { ...prevState }
                    temp.enQueue(args)
                    return temp as Queue<NotificationInterface>
                }) // sets the queue state with the new state with the new notification enqueueud

                // creates timeout to dequeue the notification after 10 seconds
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

    // function to delete notification
    const deleteNotification = (idx: number): void => {
        setQueue(prevState => {
            const temp = { ...prevState }
            temp.deQueueSpecific(idx) // removes specific notification from queue
            return temp as Queue<NotificationInterface>
        })
    }

    return [queue.queue, createNotification, deleteNotification]
}
