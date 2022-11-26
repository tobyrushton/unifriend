import { FC, useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { LoadingProvider } from '../../../components'
import { useLoadingScreen } from '../../../hooks'

type props = {
    loading?: boolean
}

const ProviderTestComponent: FC<props> = ({ loading }) => {
    const { setLoading } = useLoadingScreen()

    useEffect(() => {
        if (loading) setLoading(loading)
    }, [setLoading, loading])

    return <div>Test Component</div>
}

describe('Loading Provider tests', () => {
    it('children can consume context', () => {
        render(
            <LoadingProvider>
                <ProviderTestComponent />
            </LoadingProvider>
        )

        expect(screen.queryByText(/^Test Component$/i)).toBeTruthy()
    })

    it('can enable loading screen', () => {
        const { container } = render(
            <LoadingProvider>
                <ProviderTestComponent loading />
            </LoadingProvider>
        )
        expect(
            container.getElementsByClassName('backgroundScreen').length
        ).toBe(1)
    })

    it('can disable loading screen', async () => {
        const { container } = render(
            <LoadingProvider>
                <ProviderTestComponent loading />
            </LoadingProvider>
        )
        expect(
            container.getElementsByClassName('backgroundScreen').length
        ).toBe(1)
        const { container: container2 } = render(
            <LoadingProvider>
                <ProviderTestComponent loading={false} />
            </LoadingProvider>
        )
        expect(
            container2.getElementsByClassName('backgroundScreen').length
        ).toBe(0)
    })
})
