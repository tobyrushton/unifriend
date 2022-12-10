import { FC, useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/modules/UI.module.scss'
import { ProfilePictureProps } from '../../types'
import { getImage } from '../../lib/utils/handleImages'

export const ProfilePicture: FC<ProfilePictureProps> = ({
    image,
    width,
    style,
    height,
}) => {
    const [src, setSrc] = useState<string>()

    return (
        <Image
            className={styles.profilePicture}
            src={src ?? getImage(image)}
            alt="Profile Picture"
            style={style}
            height={height ?? 150}
            width={width ?? 150}
            placeholder="blur"
            blurDataURL="/Profile-picture.png"
            onError={() => setSrc('/Profile-picture.png')}
        />
    )
}
