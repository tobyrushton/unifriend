import { FC } from 'react'
import styles from '../../styles/LoadingScreen.module.scss'

export const LoadingScreen: FC = () => {
    return (
        <div className={styles.backgroundScreen}>
            <div className={styles.loaderContainer}>
                <div className={styles.loader} />
            </div>
        </div>
    )
}
