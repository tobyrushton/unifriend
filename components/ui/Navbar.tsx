import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from './Logo'
import styles from '../../styles/modules/UI.module.scss'

export const Navbar: FC = () => {
    return (
        <div className={styles.navbar}>
            <Logo color="secondary" style={{ marginLeft: '2.5%' }} />
            <Link href="/a/messages" style={{ marginLeft: '60%' }}>
                <Image
                    src="/Message-Icon.svg"
                    alt="Message Icon"
                    width={100}
                    height={100}
                />
            </Link>
        </div>
    )
}
