import { FC } from 'react'
import { TextProps } from '../../types'
import styles from '../../styles/modules/UI.module.scss'
import { colors } from '../../styles/reusables/colors'

export const Text: FC<TextProps> = ({
    bold,
    header,
    children,
    style,
    large,
    small,
    clickable,
    color,
}) => {
    const styling = color
        ? {
              ...{
                  color:
                      color === 'primary' ? colors.primary : colors.secondary,
              },
              ...styles,
          }
        : styles
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
            } ${small ? styles.small : ''} ${
                clickable ? styles.clickable : ''
            }`}
            style={styling}
        >
            {children}
        </p>
    )
}
