import { FC } from 'react'
import { Text } from '../ui'

export const ConfirmEmailScreen: FC = () => {
    return (
        <>
            <Text header>Please confirm your email</Text>
            <Text>
                If the email does not appear in your inbox, please check your
                junk folder.
            </Text>
        </>
    )
}
