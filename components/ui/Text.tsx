import { FC } from 'react'
import { TextProps } from '../../types'
import styles from '../../styles/modules/UI.module.scss'

export const Text: FC<TextProps> = ({ bold, header, children }) => {
    return header ? (
        <h1
            className={
                bold
                    ? `${styles.fontTextBold} ${styles.large}`
                    : `${styles.fontText} ${styles.large}`
            }
        >
            {children}
        </h1>
    ) : (
        <p className={bold ? styles.fontTextBold : styles.fontText}>
            {children}
        </p>
    )
}
