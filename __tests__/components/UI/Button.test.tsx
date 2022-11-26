import { screen, render, fireEvent } from '@testing-library/react'
import { Button } from '../../../components'

describe('Button component tests', () => {
    let clicked = false

    const onClick = (): void => {
        clicked = true
    }

    beforeEach(() => {
        clicked = false
    })

    it('button renders with text', () => {
        render(<Button onClick={onClick}> Hello World! </Button>)
        expect(screen.getByText(/^Hello World!$/i)).toBeTruthy()
    })

    it('button disables', () => {
        render(
            <Button inactive onClick={onClick}>
                {' '}
                Hello World!{' '}
            </Button>
        )

        fireEvent.click(screen.getByRole('button'))
        expect(clicked).toBeFalsy()
    })

    it('button clicks', () => {
        render(<Button onClick={onClick}> Click!</Button>)
        fireEvent.click(screen.getByRole('button'))

        expect(clicked).toBeTruthy()
    })
})
