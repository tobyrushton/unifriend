import { FC } from 'react'
import { NavbarProps } from '../../types'
import { Logo } from './Logo'
import styles from '../../styles/modules/UI.module.scss'

export const Navbar: FC<NavbarProps> = ({ hidden }) => {
    if (hidden) return null
    return (
        <div className={styles.navbar}>
            <Logo color="secondary" />
        </div>
    )
}
