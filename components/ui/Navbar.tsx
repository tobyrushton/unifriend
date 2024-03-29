'use client'

import { FC, RefObject, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from './Logo'
import { ProfilePicture } from './ProfilePicture'
import { DropDown } from './DropDown'
import { useUser } from '../../hooks/providers/useUser'
import styles from '../../styles/modules/UI.module.scss'

export const Navbar: FC = () => {
    const [displayDropDown, setDisplayDropDown] = useState<boolean>(false)
    const triangleRef = useRef<HTMLDivElement>(null)
    const {
        user: { id },
    } = useUser()

    // function to handle everytime a click is registered.
    const handleClickOutside = useMemo(
        () =>
            (
                event: MouseEvent,
                containerRef: RefObject<HTMLDivElement>
            ): void => {
                const { current: wrap } = containerRef
                const { current: buttonWrap } = triangleRef
                // if the click is not either on the button to
                // enable it or the drop down it sets display to false
                if (
                    wrap &&
                    !wrap.contains(
                        event.target instanceof Node ? event.target : null
                    ) &&
                    !buttonWrap?.contains(
                        event.target instanceof Node ? event.target : null
                    )
                ) {
                    setDisplayDropDown(false)
                }
            },
        []
    )

    return (
        <nav className={styles.navbar}>
            <Link href="/a" passHref legacyBehavior>
                {/* eslint-disable-next-line */}
                <a style={{ textDecoration: 'none'}}>
                    <Logo
                        color="secondaryText"
                        style={{ marginLeft: '2.5%' }}
                    />
                </a>
            </Link>
            <div className={styles.pushLeft}>
                <Link href="/a/messages" passHref legacyBehavior>
                    {/* eslint-disable-next-line */}
                    <a>
                        <Image
                            src="/Message-Icon.svg"
                            alt="Message Icon"
                            width={100}
                            height={48}
                        />
                    </a>
                </Link>
            </div>
            <ProfilePicture
                image={id}
                width={75}
                height={75}
                style={{ marginLeft: '5%' }}
            />
            <div
                className={
                    displayDropDown
                        ? `${styles.triangle} ${styles.rotate}`
                        : styles.triangle
                }
                onClick={() => setDisplayDropDown(!displayDropDown)}
                role="button"
                tabIndex={0}
                aria-label="Display Drop Down Menu"
                ref={triangleRef}
            />
            {displayDropDown ? (
                <DropDown handleClickOutside={handleClickOutside} />
            ) : null}
        </nav>
    )
}
