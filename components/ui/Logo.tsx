import { FC } from 'react'
import { LogoProps } from '../../types'
import styles from '../../styles/modules/UI.module.scss'
import { colors } from '../../styles/reusables/colors'

export const Logo: FC<LogoProps> = ({ color, style }) => (
    <div
        style={{
            ...{
                color: colors[color],
            },
            ...style,
        }}
        className={styles.fontLogo}
    >
        UniFriend
    </div>
)
