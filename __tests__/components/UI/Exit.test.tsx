import { render, fireEvent } from '@testing-library/react'
import { Exit } from '../../../components'
import '@testing-library/jest-dom'

describe('Exit', () => {
    it('should render', () => {
        const { container } = render(<Exit onClick={jest.fn()} />)
        expect(container).toBeTruthy()
    })
    it('should call onClick', () => {
        const onClick = jest.fn()
        const { getByRole } = render(<Exit onClick={onClick} />)
        fireEvent.click(getByRole('button'))
        expect(onClick).toHaveBeenCalled()
    })
})
