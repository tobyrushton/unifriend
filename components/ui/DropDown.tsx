import { FC, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Text } from './Text'
import styles from '../../styles/modules/UI.module.scss'
import { DropDownProps } from '../../types'
import { useSignOut, useLoadingScreen, useNotifications } from '../../hooks'

export const DropDown: FC<DropDownProps> = ({ handleClickOutside }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { loading, response: signOut } = useSignOut()
    const { setLoading } = useLoadingScreen()
    const { createNotification } = useNotifications()

    useEffect(() => {
        setLoading(loading)
    }, [loading, setLoading])

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

    // function to handle sign out.
    const handleSignOut = async (): Promise<void> => {
        const { error } = await signOut()
        if (error)
            createNotification({
                type: 'error',
                content: error.message,
            })
        else
            createNotification({
                type: 'success',
                content: 'Logged out successfully',
            })
    }

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
            <div className={styles.item}>
                <Text color="error" clickable onClick={handleSignOut}>
                    Log out
                </Text>
            </div>
        </div>
    )
}
