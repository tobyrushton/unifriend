'use client'

import { FC } from 'react'
import { Text } from './Text'
import { ProfilePicture } from './ProfilePicture'
import { UserObjectWithID } from '../../types'
import { getAge } from '../../lib/utils'
import styles from '../../styles/modules/UI.module.scss'

export const User: FC<{ user: UserObjectWithID }> = ({ user }) => {
    return (
        <div className={styles.user}>
            <div className={styles.userHeader}>
                <ProfilePicture image={user.id} width={75} height={75} />
                <div className={styles.userHeaderText}>
                    <Text header>
                        {user.firstName} {user.lastName}
                    </Text>
                    <Text>📚 {user.course}</Text>
                    <Text>🎓 {user.university}</Text>
                    <Text>🎂 {getAge(user.birthday)} years old</Text>
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <Text>{user.bio}</Text>
            </div>
        </div>
    )
}
