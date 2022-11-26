import { render, screen } from '@testing-library/react'
import { Logo } from '../../../components'

describe('Logo component tests', () => {
    it('component renders', () => {
        render(<Logo color="primary" />)
        expect(screen.getByText(/^UniFriend$/i))
    })
})
