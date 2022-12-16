import { render, screen, act } from '@testing-library/react'
import RootLayout from '../../app/layout'
import '@testing-library/jest-dom'

describe('root layout tests', () => {
    it('can render', async () => {
        const { container } = await act(async () =>
            render(
                <RootLayout>
                    <div>Hello World!</div>
                </RootLayout>
            )
        )

        expect(container).toBeTruthy()
        expect(screen.getByText('Hello World!')).toBeInTheDocument()
    })
})
