import { FC, useState, useRef, RefObject } from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import { DropDown } from '../../../components'

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
    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')

    it('component renders', async () => {
        const { container } = await act(async () =>
            render(<DropDown handleClickOutside={() => ''} />)
        )

        expect(container).toBeTruthy()
        expect(screen.queryByText('Friend Requests')).toBeTruthy()
        expect(screen.queryByText('Settings')).toBeTruthy()
        expect(screen.queryByText('View Profile')).toBeTruthy()
    })

    it('component can be disabled', async () => {
        /* eslint-disable-next-line */
        const map:Record<string, any> = {
            mousedown: null,
        }
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb
        })

        await act(async () => render(<TestComponent />))
        expect(screen.queryByText('Friend Requests')).toBeTruthy()

        await act(async () => map.mousedown({ pageX: 0, pageY: 0 }))

        await waitFor(() => {
            expect(screen.queryByText('Friend Requests')).toBeFalsy()
        })
    })
})
