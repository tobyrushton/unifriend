import 'server-only'

import { FC } from 'react'
import Image from 'next/image'
import { ProfilePicture } from '../../../../components'
import styles from '../../../../styles/modules/Messages.module.scss'
import UIStyles from '../../../../styles/modules/UI.module.scss'

const MessageLoading: FC = () => {
    return (
        <>
            <div className={styles.header}>
                <ProfilePicture
                    image="/Profile-picture.png"
                    width={100}
                    height={100}
                />
                <div
                    className={styles.loadingItem}
                    style={{ width: '16rem' }}
                />
            </div>
            <div className={styles.messageBar}>
                <div className={styles.inputForm}>
                    <input
                        className={`${UIStyles.inputBox} ${UIStyles.fontText}`}
                        placeholder="send new message"
                        type="text"
                    />
                    <div className={styles.inputButton}>
                        <Image
                            src="/send-arrow.png"
                            alt="send icon"
                            width={50}
                            height={50}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessageLoading
