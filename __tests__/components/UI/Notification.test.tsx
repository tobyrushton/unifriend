import { render, screen, fireEvent } from '@testing-library/react'
import { Notification } from '../../../components'

describe('Notification component tests', () => {
    let clicked = false

    const onClick = (): void => {
        clicked = true
    }

    beforeEach(() => {
        clicked = false
    })

    it('renders with text', () => {
        render(
            <Notification
                onClick={onClick}
                type="error"
                content="Test Content"
            />
        )

        expect(screen.getByText('Test Content')).toBeTruthy()
    })

    it('click functionaility works', () => {
        render(
            <Notification
                onClick={onClick}
                type="success"
                content="Test Content"
            />
        )

        fireEvent.click(screen.getByRole('button'))
        expect(clicked).toBeTruthy()
    })
})
