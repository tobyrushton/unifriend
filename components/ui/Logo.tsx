import { FC } from 'react'
import { LogoProps } from '../../types'
import { useTheme } from '../../hooks/providers/useTheme'
import styles from '../../styles/modules/UI.module.scss'

export const Logo: FC<LogoProps> = ({ color, style }) => {
    const { theme } = useTheme()

    return (
        <div
            style={{
                ...{
                    color: theme[color],
                },
                ...style,
            }}
            className={styles.fontLogo}
        >
            UniFriend
        </div>
    )
}
