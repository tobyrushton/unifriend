import { render, fireEvent } from '@testing-library/react'
import { Button } from '../../../components'
import '@testing-library/jest-dom'

describe('Button', () => {
    it('should render', () => {
        const { getByText, container } = render(
            <Button onClick={jest.fn()}>Test</Button>
        )
        expect(container.firstChild).toMatchSnapshot()
        expect(getByText('Test')).toBeInTheDocument()
    })
    it('should render filled', () => {
        const { getByText } = render(
            <Button onClick={jest.fn()} filled>
                Test
            </Button>
        )
        expect(getByText('Test')).toHaveClass('filled')
    })
    it('should render inactive', () => {
        const { getByText } = render(
            <Button onClick={jest.fn()} inactive>
                Test
            </Button>
        )
        expect(getByText('Test')).toHaveClass('inactive')
        expect(getByText('Test')).toBeDisabled()
    })
    it('should render with style', () => {
        const { getByText } = render(
            <Button onClick={jest.fn()} style={{ color: 'red' }}>
                Test
            </Button>
        )
        expect(getByText('Test')).toHaveStyle('color: red')
    })
    it('should render with submit type', () => {
        const { getByText } = render(
            <Button onClick={jest.fn()} submit>
                Test
            </Button>
        )
        expect(getByText('Test')).toHaveAttribute('type', 'submit')
    })
    it('should call onClick', () => {
        const onClick = jest.fn()
        const { getByText } = render(<Button onClick={onClick}>Test</Button>)
        fireEvent.click(getByText('Test'))
        expect(onClick).toHaveBeenCalled()
    })
    it('should not call onClick if inactive', () => {
        const onClick = jest.fn()
        const { getByText } = render(
            <Button onClick={onClick} inactive>
                Test
            </Button>
        )
        fireEvent.click(getByText('Test'))
        expect(onClick).not.toHaveBeenCalled()
    })
    it('should not call onClick on enter if inactive', () => {
        const onClick = jest.fn()
        const { getByText } = render(
            <Button onClick={onClick} inactive>
                Test
            </Button>
        )
        fireEvent.keyDown(getByText('Test'), { key: 'Enter', code: 13 })
        expect(onClick).not.toHaveBeenCalled()
    })
})
