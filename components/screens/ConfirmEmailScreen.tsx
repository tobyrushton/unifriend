import { FC } from 'react'
import { Text } from '../ui'

export const ConfirmEmailScreen: FC = () => {
    return (
        <>
            <Text header textAlign="center">
                Please confirm your email
            </Text>
            <Text textAlign="center" style={{ marginTop: '10%' }}>
                If the email does not appear in your inbox, please check your
                junk folder.
            </Text>
        </>
    )
}
