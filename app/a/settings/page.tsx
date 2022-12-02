'use client'

import { FC, useState } from 'react'
import {
    Text,
    SlideOne,
    SlideTwo,
    SlideThree,
    SlideFour,
} from '../../../components'
import styles from '../../../styles/modules/Settings.module.scss'

const Page: FC = () => {
    const [slide, setSlide] = useState<number>(1)

    return (
        <div className={styles.container}>
            <div className={styles.optionsContainer}>
                <Text bold header>
                    Settings
                </Text>
                <Text large clickable onClick={() => setSlide(1)}>
                    Colour theme
                </Text>
                <Text large clickable onClick={() => setSlide(2)}>
                    University Preference
                </Text>
                <Text large clickable onClick={() => setSlide(3)}>
                    Edit account information
                </Text>
                <Text large clickable onClick={() => setSlide(4)}>
                    Delete account
                </Text>
            </div>
            <div className={styles.changesContainer}>
                {
                    {
                        1: <SlideOne />,
                        2: <SlideTwo />,
                        3: <SlideThree />,
                        4: <SlideFour />,
                    }[slide]
                }
            </div>
        </div>
    )
}

export default Page
