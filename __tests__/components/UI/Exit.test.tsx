import { render, screen, fireEvent } from '@testing-library/react'
import { Exit } from '../../../components'

describe('Exit component tests', () => {
    let clicked = false

    const onClick = (): void => {
        clicked = true
    }

    beforeEach(() => {
        clicked = false
    })

    it('component renders', () => {
        render(<Exit onClick={onClick} />)

        expect(screen.getByRole('button')).toBeTruthy()
    })

    it('component updates value on click', () => {
        render(<Exit onClick={onClick} />)
        fireEvent.click(screen.getByRole('button'))
        expect(clicked).toBeTruthy()
    })
})
