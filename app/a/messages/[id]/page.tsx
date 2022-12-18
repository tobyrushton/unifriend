'use client'

import { FC, useEffect } from 'react'
import Image from 'next/image'
import { ProfilePicture, Text, Input } from '../../../../components'
import styles from '../../../../styles/modules/Messages.module.scss'

const Page: FC<{ params: { id: string } }> = ({ params }) => {
    useEffect(() => {
        // data fetching here
    }, [params])

    return (
        <>
            <div className={styles.header}>
                <ProfilePicture image="" width={100} height={100} />
                <Text header> users name </Text>
            </div>
            <div className={styles.messageBar}>
                <Input
                    placeholder="start a new message"
                    type="text"
                    setValue={() => ''}
                />
                <Image
                    src="/send-arrow.png"
                    alt="send icon"
                    width={50}
                    height={50}
                />
            </div>
        </>
    )
}

export default Page
