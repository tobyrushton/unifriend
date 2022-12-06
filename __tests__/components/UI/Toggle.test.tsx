import { render, screen, fireEvent, act } from '@testing-library/react'
import { Toggle } from '../../../components'
import '@testing-library/jest-dom'

describe('Toggle component tests', () => {
    it('component renders', () => {
        const { container } = render(<Toggle onCheck={jest.fn()} />)
        expect(container).toBeTruthy()
    })

    it('can be toggled', async () => {
        const func = jest.fn()
        render(<Toggle onCheck={func} />)

        await act(() => {
            fireEvent.click(screen.getByLabelText('Toggle'))
        })

        expect(func).toHaveBeenCalledTimes(1)
    })

    it('can take default value', () => {
        render(<Toggle onCheck={jest.fn()} value />)

        expect(screen.getByLabelText('Toggle')).toBeChecked()
    })
})
