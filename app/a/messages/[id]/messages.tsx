'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { Message, Text } from '../../../../components'
import { useUser, useMessages } from '../../../../hooks'
import { MessageContextMenuInterface } from '../../../../types'
import { ContextMenu } from './contextMenu'
import styles from '../../../../styles/modules/Messages.module.scss'

export const Messages: FC = () => {
    const [contextMenu, setContextMenu] =
        useState<MessageContextMenuInterface | null>(null)
    // hooks
    const { user } = useUser()
    const { messages } = useMessages()

    // ref to the bottom of the messages
    const bottom = useRef<HTMLDivElement | null>(null)

    const scrollToBottom = (): void => {
        bottom.current?.scrollIntoView()
    }

    // calculates the left position of the context menu
    const calcLeft = (x: number): number => {
        const width = window.innerWidth - 400
        const left = x - 400

        if (left > width - 100) return width - 100
        return left
    }

    // scrolls to the bottom of the messages when the messages are updated
    useEffect(scrollToBottom, [messages.length])

    useEffect(() => {
        // exit function if contextMenu is not enabled
        if (!contextMenu?.clicked) return undefined

        // set context menu to disabled
        const handleClick = (): void => {
            setContextMenu(null)
        }
        // onClick the context menu will be disabled
        document.addEventListener('click', handleClick)

        // removes event listener on component derender
        return (): void => {
            document.removeEventListener('click', handleClick)
        }
    }, [contextMenu])

    return (
        <div className={styles.messageContainer}>
            {messages.map((message, idx) => (
                <Message
                    recieved={message.senderId !== user.id}
                    key={'message'.concat(idx.toString())}
                    onContextMenu={e => {
                        e.preventDefault()
                        if (message.senderId !== user.id) return
                        setContextMenu({
                            x: e.pageX,
                            y: e.pageY,
                            clicked: true,
                            id: message.id,
                        })
                    }}
                >
                    {message.message}
                </Message>
            ))}
            {contextMenu?.clicked && (
                <ContextMenu
                    id={contextMenu.id}
                    position={{
                        top: `${contextMenu.y - 100}px`,
                        left: `${calcLeft(contextMenu.x)}px`,
                    }}
                />
            )}
            <Text small>
                {messages.at(-1)?.senderId === user.id
                    ? messages.at(-1)?.seen
                        ? 'Seen'
                        : 'Delivered'
                    : null}
            </Text>
            <div ref={bottom} />
        </div>
    )
}
