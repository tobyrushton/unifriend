import { FC } from 'react'
import { TextProps } from '../../types'
import styles from '../../styles/modules/UI.module.scss'

export const Text: FC<TextProps> = ({
    bold,
    header,
    children,
    style,
    large,
}) => {
    return header ? (
        <h1
            className={
                bold
                    ? `${styles.fontTextBold} ${styles.extraLarge}`
                    : `${styles.fontText} ${styles.extraLarge}`
            }
            style={style}
        >
            {children}
        </h1>
    ) : (
        <p
            className={`${bold ? styles.fontTextBold : styles.fontText} ${
                large ? styles.large : ''
            }`}
            style={style}
        >
            {children}
        </p>
    )
}
