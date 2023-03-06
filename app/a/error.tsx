'use client'

import { FC } from 'react'
import { Button, Text } from '../../components'
import { useUser, useTheme } from '../../hooks'
import styles from '../../styles/modules/Error.module.scss'

const Error: FC<{ /* error: Error; */ reset: () => void }> = ({ reset }) => {
    // context used in order to change style based on the users theme
    const { settings } = useUser()
    const { theme } = useTheme()

    return (
        <div className={styles.errorWrapper}>
            <div
                className={styles.errorContainer}
                style={
                    settings.darkMode
                        ? undefined
                        : {
                              borderStyle: 'solid',
                              borderColor: theme.accent,
                              borderWidth: '1px',
                          }
                }
            >
                <Text textAlign="center">An error has occured.</Text>
                <Text textAlign="center">Please try again.</Text>
                <Button onClick={reset}>Try again</Button>
            </div>
        </div>
    )
}

export default Error
