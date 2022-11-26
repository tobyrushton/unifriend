import { render, fireEvent } from '@testing-library/react'
import { Text } from '../../../components'

describe('Text component tests', () => {
    it('renders text inside', () => {
        const { queryByText } = render(<Text> Hello World! </Text>)
        expect(queryByText(/^Hello World!$/i)).toBeTruthy()
    })

    it('click property works', () => {
        let clicked = false
        const onClick = (): void => {
            clicked = true
        }
        const { getByText } = render(
            <Text clickable onClick={onClick}>
                {' '}
                Hello World!{' '}
            </Text>
        )
        fireEvent.click(getByText(/^Hello World!$/i))
        expect(clicked).toBeTruthy()
    })
})
