import { render } from '@testing-library/react'
import { LoadingScreen } from '../../../components'

describe('Loading screen tests', () => {
    it('component renders', () => {
        const { container } = render(<LoadingScreen />)

        expect(container).toBeTruthy()
        expect(container.firstElementChild?.className).toBe('backgroundScreen')
        expect(container.firstElementChild?.firstElementChild?.className).toBe(
            'loaderContainer'
        )
        expect(
            container.firstElementChild?.firstElementChild?.firstElementChild
                ?.className
        ).toBe('loadingRing')
    })
})
