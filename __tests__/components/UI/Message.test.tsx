import { render } from '@testing-library/react'
import { Message } from '../../../components'

describe('Message', () => {
    it('should render correctly', () => {
        const { container } = render(<Message>Test</Message>)
        expect(container).toMatchSnapshot()
    })

    it('should render correctly with recieved prop', () => {
        const { container } = render(<Message recieved>Test</Message>)
        expect(container).toMatchSnapshot()
    })
})
