import { FC } from 'react'
import { MessageProps } from '../../types'
import { Text } from './Text'
import styles from '../../styles/modules/UI.module.scss'

export const Message: FC<MessageProps> = ({ recieved, children }) => {
    return (
        <div
            className={`${styles.message} ${
                recieved ? styles.recieved : undefined
            }`}
        >
            <Text>{children}</Text>
        </div>
    )
}
