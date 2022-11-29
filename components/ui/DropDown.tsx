import { FC, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from '../../styles/modules/UI.module.scss'
import { DropDownProps } from '../../types'

export const DropDown: FC<DropDownProps> = ({ handleClickOutside }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // creates an event listener to listen for clicks.
        document.addEventListener('mousedown', e =>
            handleClickOutside(e, containerRef)
        )

        return () => {
            document.removeEventListener('mousedown', e =>
                handleClickOutside(e, containerRef)
            )
        }
    }, [handleClickOutside])

    return (
        <div className={styles.dropdown} ref={containerRef}>
            <div className={styles.item}>
                <Link href="/a/profile">View Profile</Link>
            </div>
            <div className={styles.item}>
                <Link href="/a/settings">Settings</Link>
            </div>
            <div className={styles.item}>
                <Link href="/a/requests">Friend Requests</Link>
            </div>
        </div>
    )
}
