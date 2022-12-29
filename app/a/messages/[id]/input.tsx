'use client'

import { FC } from 'react'
import { Input } from '../../../../components'

export const MessageInput: FC = () => {
    return (
        <Input placeholder="send new message" type="text" setValue={() => ''} />
    )
}
