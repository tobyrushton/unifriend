'use client'

import { FC } from 'react'
import { MessageProps } from '../../types'
import { Text } from './Text'
import styles from '../../styles/modules/UI.module.scss'

export const Message: FC<MessageProps> = ({ sent, children }) => {
    return (
        <div className={`${styles.message} ${sent ? styles.sent : undefined}`}>
            <Text>{children}</Text>
        </div>
    )
}
