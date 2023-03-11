import 'server-only'
import { FC } from 'react'
import { Text } from '../../../components'

const Page: FC = () => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '100px',
                padding: '3rem',
                width: 'calc(100% - 6rem)',
                height: 'calc(100% - 100px - 6rem)',
                backgroundColor: 'var(--background-color)',
            }}
        >
            <Text header>About UniFriend</Text>
            <Text
                style={{
                    marginTop: '1rem',
                }}
            >
                UniFriend is a social network for university students. It is a
                place where you can meet new people, make friends, and find
                people with similar interests.
            </Text>
            <Text
                header
                style={{
                    marginTop: '2rem',
                }}
            >
                Our Aims
            </Text>
            <Text
                style={{
                    marginTop: '1rem',
                }}
            >
                Our aim is to provide a safe and friendly environment for
                students to meet new people and make friends. We want to help
                students find people with similar interests and hobbies.
            </Text>
        </div>
    )
}

export default Page
