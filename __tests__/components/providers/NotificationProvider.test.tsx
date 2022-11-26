import {
    render,
    screen,
    fireEvent,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import { FC, useEffect } from 'react'
import { act } from 'react-dom/test-utils'
import { NotificationProvider, Text } from '../../../components'
import { useNotifications } from '../../../hooks'
import { NotificationInterface } from '../../../types'

type props = {
    notifications?: NotificationInterface[]
}

const TestComponent: FC<props> = ({ notifications }) => {
    const { createNotification } = useNotifications()

    useEffect(() => {
        if (notifications)
            notifications.forEach(val => {
                createNotification(val)
            })
    }, [createNotification, notifications])

    return <div>Test Component</div>
}

describe('Notification provider tests', () => {
    it('provider renders children', () => {
        render(
            <NotificationProvider>
                <Text>Hello World!</Text>
            </NotificationProvider>
        )
        expect(screen.getByText(/^Hello World!$/i)).toBeTruthy()
    })

    it('child can consume context', () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        )

        expect(screen.getAllByText(/^Test Component$/i)).toBeTruthy()
    })

    it('can create notification', () => {
        render(
            <NotificationProvider>
                <TestComponent
                    notifications={[
                        { type: 'error', content: 'Test Notification' },
                    ]}
                />
            </NotificationProvider>
        )
        expect(screen.getByText(/^Test Notification$/i)).toBeTruthy()
    })

    it('can create multiple notifications', () => {
        render(
            <NotificationProvider>
                <TestComponent
                    notifications={[
                        { type: 'error', content: 'Test Notification' },
                        { type: 'error', content: 'Test Notification' },
                        { type: 'error', content: 'Test Notification' },
                    ]}
                />
            </NotificationProvider>
        )
        expect(screen.getAllByText(/^Test Notification$/i).length).toBe(3)
    })

    it('can press exit on notification', () => {
        render(
            <NotificationProvider>
                <TestComponent
                    notifications={[
                        { type: 'error', content: 'Test Notification' },
                    ]}
                />
            </NotificationProvider>
        )
        fireEvent.click(screen.getByRole('button'))
        expect(screen.queryByText(/^Test Notification$/i)).toBeFalsy()
    })

    it('can press exit on notification with multiple', () => {
        render(
            <NotificationProvider>
                <TestComponent
                    notifications={[
                        { type: 'error', content: 'should be deleted' },
                        { type: 'error', content: 'should stay' },
                    ]}
                />
            </NotificationProvider>
        )
        fireEvent.click(screen.getAllByRole('button')[0])
        expect(screen.queryByText(/^should be deleted$/i)).toBeFalsy()
        expect(screen.getByText(/^should stay$/i)).toBeTruthy()
    })

    it('derenders after 10 seconds', async () => {
        act(() => {
            render(
                <NotificationProvider>
                    <TestComponent
                        notifications={[
                            { type: 'error', content: 'Test Notification' },
                        ]}
                    />
                </NotificationProvider>
            )
        })
        await waitForElementToBeRemoved(
            () => screen.queryByText(/^Test Notification$/i),
            { timeout: 15_000 }
        )
        expect(screen.queryByText(/^Test Notification$/i)).toBeFalsy()
    }, 20_000)
})
