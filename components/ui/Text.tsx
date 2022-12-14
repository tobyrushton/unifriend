import { FC } from 'react'
import { TextProps } from '../../types'
import { useTheme } from '../../hooks/providers/useTheme'
import styles from '../../styles/modules/UI.module.scss'

export const Text: FC<TextProps> = ({
    bold,
    header,
    children,
    style,
    large,
    small,
    clickable,
    color,
    onClick,
    textAlign,
}) => {
    const { theme } = useTheme()

    const styling = color
        ? {
              ...{
                  color: theme[color],
              },
              ...style,
          }
        : style

    return header ? (
        <h1
            className={
                bold
                    ? `${styles.fontTextBold} ${styles.extraLarge} ${
                          styles[textAlign ?? 'left']
                      }`
                    : `${styles.fontText} ${styles.extraLarge} ${
                          styles[textAlign ?? 'left']
                      }`
            }
            style={style}
        >
            {children}
        </h1>
    ) : clickable ? (
        <div onClick={onClick} role="button" tabIndex={0}>
            <p
                className={`${bold ? styles.fontTextBold : styles.fontText} ${
                    large ? styles.large : ''
                } ${small ? styles.small : ''} ${styles.clickable} ${
                    styles[textAlign ?? 'left']
                }`}
                style={styling}
            >
                {children}
            </p>
        </div>
    ) : (
        <p
            className={`${bold ? styles.fontTextBold : styles.fontText} ${
                large ? styles.large : ''
            } ${small ? styles.small : ''} ${styles[textAlign ?? 'left']}`}
            style={styling}
        >
            {children}
        </p>
    )
}
