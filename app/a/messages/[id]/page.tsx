import 'server-only'

import { ReactElement } from 'react'
import { ProfilePicture, Text } from '../../../../components'
import { IDArguement, MessageWithId, QueryReturn } from '../../../../types'
import { initiateApollo } from '../../../../lib/apollo'
import { GET_MESSAGES } from '../../../../graphql/queries'
import { isError } from '../../../../lib/utils'
import { MessageInput } from './input'
import { Messages } from './messages'
import styles from '../../../../styles/modules/Messages.module.scss'

const getData = async (id: string): Promise<MessageWithId[] | Error> => {
    const apollo = initiateApollo()

    const { data, error } = await apollo.query<
        QueryReturn<MessageWithId[], 'Message', 'GetMessages'>,
        IDArguement
    >({ query: GET_MESSAGES, variables: { id } })

    if (error) return error
    return data.GetMessages
}

const Page = async ({
    params,
}: {
    params: { id: string }
}): Promise<ReactElement> => {
    const messages = await getData(params.id)
    if (isError(messages)) throw messages // throws on error

    return (
        <>
            <div className={styles.header}>
                <ProfilePicture image="" width={100} height={100} />
                <Text header> users name </Text>
            </div>
            <Messages messages={messages} />
            <MessageInput id={params.id} />
        </>
    )
}

export default Page
