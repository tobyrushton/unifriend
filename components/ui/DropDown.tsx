import { FC, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { Text } from './Text'
import styles from '../../styles/modules/UI.module.scss'
import { DropDownProps } from '../../types'

export const DropDown: FC<DropDownProps> = ({ exit, buttonRef }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = useMemo(
        () =>
            (event: MouseEvent): void => {
                const { current: wrap } = containerRef
                const { current: buttonWrap } = buttonRef
                // on click if the click is outside the drop down menu it will close the menu
                if (
                    wrap &&
                    !wrap.contains(
                        event.target instanceof Node ? event.target : null
                    ) &&
                    !buttonWrap?.contains(
                        event.target instanceof Node ? event.target : null
                    )
                ) {
                    exit()
                }
            },
        [exit, buttonRef]
    )

    useEffect(() => {
        // creates an event listener to listen for clicks.
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside])

    return (
        <div className={styles.dropdown} ref={containerRef}>
            <div className={styles.item}>
                <Link href="/a/profile">
                    <Text>View profile</Text>
                </Link>
            </div>
            <div className={styles.item}>
                <Link href="/a/settings">
                    <Text>Settings</Text>
                </Link>
            </div>
            <div className={styles.item}>
                <Link href="/a/requests">
                    <Text>Friend Requests</Text>
                </Link>
            </div>
        </div>
    )
}
