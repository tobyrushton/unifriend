'use client'

import { FC, useState, useEffect } from 'react'
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

    useEffect(() => {
        setSrc(undefined)
    }, [image, setSrc])

    return (
        <Image
            className={styles.profilePicture}
            src={src ?? (image.includes('/') ? image : getImage(image))}
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
