import { FC } from 'react'
import { LogoProps, Theme } from '../../types'
import styles from '../../styles/modules/UI.module.scss'
import { colors } from '../../styles/reusables/colors'

export const Logo: FC<LogoProps> = ({ color, style }) => (
    <div
        style={{
            ...{
                color: colors[
                    typeof window === 'undefined'
                        ? 'light'
                        : (document.documentElement.getAttribute(
                              'data-theme'
                          ) as Theme)
                ][color],
            },
            ...style,
        }}
        className={styles.fontLogo}
    >
        UniFriend
    </div>
)
