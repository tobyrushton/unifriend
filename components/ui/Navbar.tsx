import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from './Logo'
import { ProfilePicture } from './ProfilePicture'
import styles from '../../styles/modules/UI.module.scss'
import png from '../../public/Profile-picture.png'

export const Navbar: FC = () => {
    return (
        <div className={styles.navbar}>
            <Logo color="secondary" style={{ marginLeft: '2.5%' }} />
            <div className={styles.pushLeft}>
                <Link href="/a/messages">
                    <Image
                        src="/Message-Icon.svg"
                        alt="Message Icon"
                        width={100}
                        height={48}
                    />
                </Link>
            </div>
            <ProfilePicture
                image={png}
                width={75}
                height={75}
                style={{ marginLeft: '5%' }}
            />
            <div className={styles.triangle} />
        </div>
    )
}
