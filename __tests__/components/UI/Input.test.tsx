import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../../../components'
import '@testing-library/jest-dom'

describe('Input', () => {
    const setValue = jest.fn()

    it('should render with text', () => {
        render(
            <Input
                type="text"
                placeholder="Test Placeholder"
                setValue={setValue}
                value="Test Value"
            />
        )

        expect(
            screen.getByPlaceholderText('Test Placeholder')
        ).toBeInTheDocument()
    })
    it('should set value', () => {
        render(
            <Input
                type="text"
                placeholder="Test Placeholder"
                setValue={setValue}
            />
        )

        fireEvent.input(screen.getByPlaceholderText('Test Placeholder'), {
            target: { value: 'Test Value' },
        })
        expect(setValue).toHaveBeenCalled()
        expect(setValue).toHaveBeenCalledWith('Test Value')
        expect(screen.getByPlaceholderText('Test Placeholder')).toHaveValue(
            'Test Value'
        )
    })
    it('should render with password', () => {
        render(
            <Input
                type="password"
                placeholder="Test Placeholder"
                setValue={setValue}
                value="Test Value"
            />
        )

        expect(
            screen.getByPlaceholderText('Test Placeholder')
        ).toBeInTheDocument()
    })
    it('should render with file', () => {
        render(
            <Input
                type="file"
                placeholder="Test Placeholder"
                setValue={setValue}
            />
        )
        expect(
            screen.getByPlaceholderText('Test Placeholder')
        ).toBeInTheDocument()
    })
    it('should render with date', () => {
        render(
            <Input
                type="date"
                placeholder="Test Placeholder"
                setValue={setValue}
                value="Test Value"
            />
        )
        expect(
            screen.getByPlaceholderText('Test Placeholder')
        ).toBeInTheDocument()
    })
    it('should be able to set value with date', () => {
        render(
            <Input
                type="date"
                placeholder="Test Placeholder"
                setValue={setValue}
            />
        )
        fireEvent.input(screen.getByPlaceholderText('Test Placeholder'), {
            target: { value: '2005-06-12' },
        })
        expect(setValue).toHaveBeenCalled()
        expect(screen.getByPlaceholderText('Test Placeholder')).toHaveValue(
            '2005-06-12'
        )
    })
    it('should set value with password', () => {
        render(
            <Input
                type="password"
                placeholder="Test Placeholder"
                setValue={setValue}
            />
        )

        fireEvent.input(screen.getByPlaceholderText('Test Placeholder'), {
            target: { value: 'Test Value' },
        })
        expect(setValue).toHaveBeenCalled()
        expect(screen.getByPlaceholderText('Test Placeholder')).toHaveValue(
            'Test Value'
        )
    })
    it('should take a default value', () => {
        const testValue = 'Test Value'
        render(
            <Input
                type="text"
                placeholder="Test Placeholder"
                setValue={setValue}
                value={testValue}
            />
        )
        expect(screen.getByPlaceholderText('Test Placeholder')).toHaveValue(
            testValue
        )
    })
})
