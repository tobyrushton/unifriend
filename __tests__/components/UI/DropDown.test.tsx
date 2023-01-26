import { FC, useState, useRef, RefObject } from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import {
    DropDown,
    LoadingProvider,
    NotificationProvider,
} from '../../../components'
import '@testing-library/jest-dom'

jest.mock('../../../hooks/providers/useUser', () => ({
    useUser: jest.fn(() => ({
        user: {
            id: '123',
        },
    })),
}))

const TestComponent: FC = () => {
    const [display, setDisplay] = useState<boolean>(true)
    const buttonRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (
        event: MouseEvent,
        containerRef: RefObject<HTMLDivElement>
    ): void => {
        const { current: wrap } = containerRef
        const { current: buttonWrap } = buttonRef

        // on click if the click is outside the drop down menu it will close the menu
        if (
            wrap &&
            !wrap.contains(
                event.target instanceof Node ? event.target : null
            ) &&
            !buttonWrap?.contains(
                event.target instanceof Node ? event.target : null
            )
        ) {
            setDisplay(false)
        }
    }

    return (
        <div
            style={{
                position: 'absolute',
                width: '100rem',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: '0',
                    height: '1rem',
                    width: '1rem',
                }}
                data-testid="off click"
            >
                {' '}
                outside{' '}
            </div>
            <div
                onClick={() => setDisplay(!display)}
                ref={buttonRef}
                role="button"
                tabIndex={0}
                aria-label="button"
            />
            {display ? (
                <DropDown handleClickOutside={handleClickOutside} />
            ) : null}
        </div>
    )
}

describe('DropDown component tests', () => {
    it('component renders', async () => {
        const { container } = await act(async () =>
            render(
                <LoadingProvider>
                    <NotificationProvider>
                        <DropDown handleClickOutside={jest.fn()} />
                    </NotificationProvider>
                </LoadingProvider>
            )
        )

        expect(container).toBeInTheDocument()
        expect(screen.queryByText('Friend Requests')).toBeInTheDocument()
        expect(screen.queryByText('Settings')).toBeInTheDocument()
        expect(screen.queryByText('View Profile')).toBeInTheDocument()
    })

    it('component can be disabled', async () => {
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
                        <TestComponent />
                    </NotificationProvider>
                </LoadingProvider>
            )
        )
        expect(screen.queryByText('Friend Requests')).toBeInTheDocument()

        await act(async () => map.mousedown({ pageX: 0, pageY: 0 }))

        await waitFor(() => {
            expect(
                screen.queryByText('Friend Requests')
            ).not.toBeInTheDocument()
        })
    })

    it('links all contain correct hrefs', () => {
        render(
            <LoadingProvider>
                <NotificationProvider>
                    <DropDown handleClickOutside={jest.fn()} />
                </NotificationProvider>
            </LoadingProvider>
        )

        expect(
            screen.getByRole('link', { name: 'View Profile' })
        ).toHaveAttribute('href', '/a/profile/123')
        expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute(
            'href',
            '/a/settings'
        )
        expect(
            screen.getByRole('link', { name: 'Friend Requests' })
        ).toHaveAttribute('href', '/a/requests')
    })
})
