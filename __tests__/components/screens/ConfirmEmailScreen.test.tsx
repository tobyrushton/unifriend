import { render, screen } from '@testing-library/react'
import { ConfirmEmailScreen } from '../../../components'

describe('Confirm Email Screen tests', () => {
    it('component renders', () => {
        render(<ConfirmEmailScreen />)

        expect(screen.queryByText('Please confirm your email')).toBeTruthy()
        expect(
            screen.queryByText(
                'If the email does not appear in your inbox, please check your junk folder.'
            )
        ).toBeTruthy()
    })
})
