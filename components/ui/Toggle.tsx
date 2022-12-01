import { FC } from 'react'
import styles from '../../styles/modules/UI.module.scss'
import { ToggleProps } from '../../types'

export const Toggle: FC<ToggleProps> = ({ onCheck, style }) => {
    return (
        <div className={styles.toggle} style={style}>
            <input
                type="checkbox"
                id="switch"
                aria-label="Toggle"
                name="switch"
                onChange={e => onCheck(e.target.checked)}
            />
            <label htmlFor="switch">Toggle</label>
        </div>
    )
}
