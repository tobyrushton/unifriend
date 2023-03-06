import { FC } from 'react'
import { MessageProps } from '../../types'
import { Text } from './Text'
import styles from '../../styles/modules/UI.module.scss'

export const Message: FC<MessageProps> = ({
    recieved,
    children,
    onContextMenu,
}) => {
    return (
        <div
            className={`${styles.message} ${recieved ? styles.recieved : ''}`}
            onContextMenu={onContextMenu}
        >
            <Text>{children}</Text>
        </div>
    )
}
