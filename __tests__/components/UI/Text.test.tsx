import { fireEvent, render } from '@testing-library/react'
import { Text } from '../../../components'

// tests for Text component
describe('Text', () => {
    it('should render', () => {
        const { container } = render(<Text> </Text>)
        expect(container).toBeTruthy()
    })
    it('should render with text', () => {
        const { container } = render(<Text> Text </Text>)
        expect(container).toBeTruthy()
    })
    it('should render with style', () => {
        const { container } = render(<Text style={{ color: 'red' }}> </Text>)
        expect(container).toBeTruthy()
    })
    it('should render with text and style', () => {
        const { container } = render(<Text style={{ color: 'red' }}>Test</Text>)
        expect(container).toBeTruthy()
    })
    it('should call onClick function', () => {
        const onClick = jest.fn()
        const { container } = render(
            <Text onClick={onClick} clickable>
                {' '}
            </Text>
        )
        const text = container.querySelector('p')
        fireEvent.click(text as Element)
        expect(onClick).toHaveBeenCalled()
    })
})
