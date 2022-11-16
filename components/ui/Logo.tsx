import { FC } from 'react'
import { LogoProps } from '../../types'
import styles from '../../styles/modules/UI.module.scss'
import { colors } from '../../styles/reusables/colors'

export const Logo: FC<LogoProps> = ({color}) => 
    <div style={{color: color === 'primary' ? colors.primary : colors.secondary}} className={styles.fontLogo}>
        UniFriend
    </div>
