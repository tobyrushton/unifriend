import { FC, useState } from 'react'
import { authProps, logInState, signUpState } from '../../types/auth'
import styles from '../../styles/modules/Authentication.module.scss'
import { Input } from '../ui'

export const AuthScreen: FC<authProps> = ({ logIn, changeAuth }) => {
    const [state, setState ] = useState<logInState | signUpState>()

    const [test, setTest] = useState<string>('')

    const setValue = (change:string):void => {setTest(change)} 

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
                {logIn ? <div>
                    <Input placeholder='TEST' value={test} type='text' setValue={setValue}/>
                </div> : <div />}
            </div>
        </div>
    )
}
