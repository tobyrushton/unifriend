import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import {
    Navbar,
    NotificationProvider,
    LoadingProvider,
} from '../../../components'
import '@testing-library/jest-dom'

jest.mock('../../../hooks/providers/useUser', () => ({
    useUser: jest.fn(() => ({
        user: {
            id: '123',
        },
    })),
}))

describe('Navbar component tests', () => {
    it('navbar should render', async () => {
        const { container } = render(
            <LoadingProvider>
                <NotificationProvider>
                    <Navbar />
                </NotificationProvider>
            </LoadingProvider>
        )

        expect(container).toBeTruthy()
        expect(screen.queryByText(/UniFriend$/i)).toBeTruthy()
        expect(screen.queryByAltText('Profile Picture')).toBeTruthy()
        expect(screen.queryByRole('button')).toBeTruthy()
    })

    it('drop down should toggle', async () => {
        /* eslint-disable-next-line */
        const map:Record<string, any> = {
            mousedown: null,
        }
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb
        })

        await act(async () =>
            render(
                <LoadingProvider>
                    <NotificationProvider>
                        <Navbar />
                    </NotificationProvider>
                </LoadingProvider>
            )
        )

        fireEvent.click(screen.getByRole('button'))

        await waitFor(async () =>
            expect(screen.queryByText('View Profile')).toBeTruthy()
        )

        await act(async () => map.mousedown({ pageY: 0, pageX: 0 }))

        await waitFor(async () =>
            expect(screen.queryByText('View Profile')).toBeFalsy()
        )
    })

    it('Message link has correct href', async () => {
        await act(async () =>
            render(
                <LoadingProvider>
                    <NotificationProvider>
                        <Navbar />
                    </NotificationProvider>
                </LoadingProvider>
            )
        )

        expect(screen.getAllByRole('link').length).toBe(2)
    })
})
