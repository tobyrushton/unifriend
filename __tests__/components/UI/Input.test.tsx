import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../../../components'

describe('Input component tests', () => {
    let val = ''

    beforeEach(() => {
        val = ''
    })

    const setValue = (change: string): void => {
        val = change
    }

    it('component renders', () => {
        render(<Input placeholder="Test" setValue={setValue} type="text" />)

        expect(screen.getByPlaceholderText('Test')).toBeTruthy()
    })

    it('changes value on input', () => {
        render(<Input placeholder="Test" setValue={setValue} type="text" />)

        fireEvent.input(screen.getByPlaceholderText('Test'), {
            target: { value: 'Test Value' },
        })
        expect(val).toBe('Test Value')
    })

    it('changes value on input for date', () => {
        render(
            <Input
                placeholder="Test"
                setValue={setValue}
                type="date"
                maxLength={8}
            />
        )

        fireEvent.input(screen.getByPlaceholderText('Test'), {
            target: { value: '2005-06-12' },
        })
        expect(val).toBe('2005-06-12')
    })

    it('changes value on input for password', () => {
        render(
            <Input
                placeholder="Test"
                setValue={setValue}
                type="password"
                maxLength={8}
            />
        )

        fireEvent.input(screen.getByPlaceholderText('Test'), {
            target: { value: 'password123' },
        })
        expect(val).toBe('password123')
    })

    it('takes variable default value', () => {
        render(
            <Input
                placeholder="Test"
                setValue={setValue}
                value="Test Value"
                type="text"
                maxLength={8}
            />
        )

        expect(screen.getByDisplayValue('Test Value')).toBeTruthy()
    })
})
