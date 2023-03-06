import { render, screen, fireEvent } from '@testing-library/react'
import { Notification } from '../../../components'
import '@testing-library/jest-dom'

describe('Notification component tests', () => {
    const onClick = jest.fn()

    it('renders with text', () => {
        render(
            <Notification
                onClick={onClick}
                type="error"
                content="Test Content"
            />
        )

        expect(screen.getByText('Test Content')).toBeInTheDocument()
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
        expect(onClick).toHaveBeenCalled()
    })
})
