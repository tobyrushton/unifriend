'use client'

import { FC } from 'react'
import { Text } from '../../../../components'
import { useMutation, useNotifications } from '../../../../hooks'
import { IDArguement, MessageContextMenuProps } from '../../../../types'
import { DELETE_MESSAGE } from '../../../../graphql/queries'
import styles from '../../../../styles/modules/Messages.module.scss'

export const ContextMenu: FC<MessageContextMenuProps> = ({ id, position }) => {
    const { mutation } = useMutation()
    const { createNotification } = useNotifications()

    const handleDeleteMessage = async (): Promise<void> => {
        const { error } = await mutation<IDArguement, IDArguement>({
            mutation: DELETE_MESSAGE,
            id,
        })
        if (error)
            createNotification({
                type: 'error',
                content: 'Unable to delete message.',
            })
    }

    return (
        <div className={styles.contextMenu} style={position}>
            <Text clickable onClick={handleDeleteMessage} small>
                Delete
            </Text>
        </div>
    )
}
