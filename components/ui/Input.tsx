import { FC, BaseSyntheticEvent } from 'react'
import { InputProps } from '../../types'
import styles from '../../styles/modules/UI.module.scss'

export const Input: FC<InputProps> = ({
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
        onChange={(e: BaseSyntheticEvent) =>
            setValue(type === 'file' ? e.target.files[0] : e.target.value)
        }
        style={style}
        maxLength={maxLength}
        accept={type === 'file' ? 'image/png, image/jpeg' : undefined}
    />
)
