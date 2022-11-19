import { FC } from 'react'
import { exitProps } from '../../types'
import styles from '../../styles/modules/UI.module.scss'

export const Exit:FC<exitProps> = ({onClick}) => {
    return <div className={styles.exit} onClick={onClick}>
        <div />
        <div />
    </div>  
}