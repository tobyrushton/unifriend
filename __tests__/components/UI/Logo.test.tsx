import { render } from '@testing-library/react'
import { Logo } from '../../../components'

describe('Logo component tests', () => {
    it('should render with color', () => {
        const { container } = render(<Logo color="primary" />)
        expect(container).toBeTruthy()
    })
    it('should render with style', () => {
        const { container } = render(
            <Logo color="primary" style={{ margin: '5%' }} />
        )
        expect(container).toBeTruthy()
    })
})
