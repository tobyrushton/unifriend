import { FC } from 'react'
import { notificationProps } from '../../types'
import { Text } from './Text'
import { Exit } from './Exit'
import { colors } from '../../styles/reusables/colors'
import styles from '../../styles/modules/UI.module.scss'

export const Notification: FC<notificationProps> = ({
    type,
    content,
    onClick,
}) => {
    return (
        <div
            className={styles.notification}
            style={{
                backgroundColor:
                    type === 'error'
                        ? colors.errorColor
                        : type === 'success'
                        ? colors.successColor
                        : 'white',
                color:
                    type === 'error' || type === 'success' ? 'white' : 'black',
            }}
        >
            <Exit onClick={onClick} />
            <Text>&#9432;</Text>
            <Text>{content}</Text>
        </div>
    )
}
