import { FC } from 'react'
import { notificationProps } from '../../types/UI'
import { Color } from '../../types/colors'
import { Text } from './Text'
import { Exit } from './Exit'
import { useTheme } from '../../hooks/providers/useTheme'
import styles from '../../styles/modules/UI.module.scss'

export const Notification: FC<notificationProps> = ({
    type,
    content,
    onClick,
}) => {
    const { theme } = useTheme()

    return (
        <div
            className={styles.notification}
            style={{
                backgroundColor: theme[type as Color],
                color:
                    type === 'error' || type === 'success' ? 'white' : 'black',
            }}
        >
            <Exit onClick={onClick} />
            <Text>&#9432;</Text> {/* Information symbol */}
            <Text>{content}</Text>
        </div>
    )
}
