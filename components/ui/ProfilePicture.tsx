import { FC } from 'react'
import Image from 'next/image'
import styles from '../../styles/modules/UI.module.scss'
import { ProfilePictureProps } from '../../types'

export const ProfilePicture: FC<ProfilePictureProps> = ({
    image,
    width,
    style,
    height,
}) => {
    return (
        <Image
            className={styles.profilePicture}
            src={image}
            alt="Profile Picture"
            style={style}
            height={height ?? 150}
            width={width ?? 150}
        />
    )
}
