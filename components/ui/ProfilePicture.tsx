'use client'

import { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProfilePictureProps } from '../../types'
import { getImage } from '../../lib/utils/handleImages'
import styles from '../../styles/modules/UI.module.scss'

export const ProfilePicture: FC<ProfilePictureProps> = ({
    image,
    width,
    style,
    height,
}) => {
    const [src, setSrc] = useState<string>()

    // sets the src to undefined when the image changes
    useEffect(() => {
        setSrc(undefined)
    }, [image, setSrc])

    return (
        <Link href={`/a/profile/${image}`}>
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
        </Link>
    )
}
