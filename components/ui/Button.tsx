import { FC } from 'react'
import { ButtonProps } from '../../types'
import styles from '../../styles/modules/UI.module.scss'

export const Button: FC<ButtonProps> = ({
    onClick,
    filled,
    inactive,
    children,
    style,
    submit,
}) => (
    <button
        onClick={e => {
            e.preventDefault()
            if (!inactive) onClick()
        }}
        className={`${styles.fontText} ${styles.button} ${
            filled ? styles.filled : ''
        } ${inactive ? styles.inactive : ''}`}
        tabIndex={0}
        style={style}
        type={submit ? 'submit' : 'button'}
    >
        {children}
    </button>
)
