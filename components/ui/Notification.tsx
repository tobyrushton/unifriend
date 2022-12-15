import { FC } from 'react'
import { notificationProps } from '../../types/UI'
import { Exit } from './Exit'
import styles from '../../styles/modules/UI.module.scss'

export const Notification: FC<notificationProps> = ({
    type,
    content,
    onClick,
}) => (
    <div
        className={styles.notification}
        style={{
            backgroundColor: `var(--${type}-color)`,
            color: type === 'error' || type === 'success' ? 'white' : 'black',
        }}
    >
        <Exit onClick={onClick} />
        {/* Information symbol */}
        <p className={styles.fontText}>&#9432;</p>
        <p className={styles.fontText}>{content}</p>
    </div>
)
