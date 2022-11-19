import { useContext } from 'react'
import { NotificationContext } from '../../components/providers/NotificationProvider'
import { NotificationContextInterface } from '../../types'

export const useNotifications = (): NotificationContextInterface =>
    useContext(NotificationContext) as NotificationContextInterface
