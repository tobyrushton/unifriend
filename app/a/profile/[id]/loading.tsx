import 'server-only'

import { FC } from 'react'
import { Text, ProfilePicture } from '../../../../components'
import styles from '../../../../styles/modules/Profile.module.scss'

const ProfileLoading: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.profileContainer}>
                <ProfilePicture image="/Profile-picture.png" />
                <div className={styles.detailsContainer}>
                    <div
                        className={styles.loadingItem}
                        style={{ width: '8rem' }}
                    />
                    <div
                        className={styles.loadingItem}
                        style={{ width: '12rem' }}
                    />
                    <div
                        className={styles.loadingItem}
                        style={{ width: '8rem' }}
                    />
                    <div
                        className={styles.loadingItem}
                        style={{ width: '5rem' }}
                    />
                    <div
                        className={styles.loadingItem}
                        style={{ width: '7rem' }}
                    />
                </div>
            </div>
            <div
                className={styles.item}
                style={{
                    flexDirection: 'column',
                    height: '6rem',
                    gap: '.2rem',
                }}
            >
                <Text bold>Bio</Text>
                <div
                    className={styles.loadingItem}
                    style={{ width: '12rem' }}
                />
                <div className={styles.loadingItem} style={{ width: '8rem' }} />
            </div>
            <div className={styles.item}>
                <Text bold>Friends</Text>
            </div>
            <div className={styles.friendsContainer}>
                {new Array(10).fill([]).map((_val, idx) => (
                    <div
                        className={styles.friend}
                        key={'friend'.concat(idx.toString())}
                    >
                        <ProfilePicture
                            image="/Profile-picture.png"
                            width={50}
                            height={50}
                        />
                        <div
                            className={styles.loadingItem}
                            style={{ width: '8rem' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileLoading
