import { FC, BaseSyntheticEvent } from 'react'
import { inputProps } from '../../types'
import styles from '../../styles/modules/UI.module.scss'

export const Input: FC<inputProps> = ({
    type,
    placeholder,
    setValue,
    value,
    style,
    maxLength,
}) => (
    <input
        className={`${styles.inputBox} ${styles.fontText}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: BaseSyntheticEvent) => setValue(e.target.value)}
        style={style}
        maxLength={maxLength}
    />
)
