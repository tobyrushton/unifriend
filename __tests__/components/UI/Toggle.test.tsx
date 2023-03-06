import { render, fireEvent } from '@testing-library/react'
import { Toggle } from '../../../components'
import '@testing-library/jest-dom'

// tests for Toggle component
describe('Toggle', () => {
    const func = jest.fn()
    it('should render', () => {
        const { container } = render(<Toggle onCheck={func} />)
        expect(container).toBeTruthy()
    })
    it('should render with value', () => {
        const { container } = render(<Toggle onCheck={func} value />)
        expect(container).toBeTruthy()
    })
    it('should render with style', () => {
        const { container } = render(
            <Toggle onCheck={func} style={{ color: 'red' }} />
        )
        expect(container).toBeTruthy()
    })
    it('should call onCheck', () => {
        const onCheck = jest.fn()
        const { container } = render(<Toggle onCheck={onCheck} />)
        const input = container.querySelector('input')
        fireEvent.click(input as Element)
        expect(onCheck).toHaveBeenCalled()
    })
    it('should call onCheck with value', () => {
        const onCheck = jest.fn()
        const { container } = render(<Toggle onCheck={onCheck} />)
        const input = container.querySelector('input')
        fireEvent.click(input as Element)
        expect(onCheck).toHaveBeenCalledWith(true)
    })
})
