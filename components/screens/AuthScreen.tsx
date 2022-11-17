import { FC } from 'react'
import { authProps } from '../../types/auth'
import styles from '../../styles/modules/Authentication.module.scss'

export const AuthScreen: FC<authProps> = ({ logIn, changeAuth }) => {
    return (
        <div className={styles.fazedOut}>
            <div className={styles.authContainer}>
                <div
                    className={styles.exit}
                    onClick={() => changeAuth({ active: false })}
                    tabIndex={0}
                    role="button"
                >
                    <div />
                    <div />
                </div>
                {logIn ? <div /> : <div />}
            </div>
        </div>
    )
}
