import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { act } from 'react-dom/test-utils'
import { ForgottenPasswordScreen } from '../../../components'
import { ProviderStack } from '../../__helpers__/ProviderStack'

describe('Forgotten Password screen tests', () => {
    const supabaseAuthMock = jest.requireMock('../../../lib/supabase').supabase
        .auth

    supabaseAuthMock.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
    })

    supabaseAuthMock.resetPasswordForEmail.mockResolvedValue({
        data: undefined,
    })

    it('screen renders', async () => {
        const { container } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <ForgottenPasswordScreen />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        expect(container).toBeTruthy()
        expect(screen.queryByText('Enter account email')).toBeTruthy()
        expect(screen.queryByPlaceholderText('Account Email')).toBeTruthy()
        expect(screen.queryByText('Send recovery email')).toBeTruthy()
    })

    it('email can be sent', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <ForgottenPasswordScreen />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('Account Email'), {
                target: { value: 'test@email.ac.uk' },
            })
        })

        fireEvent.click(screen.getByText('Send recovery email'))

        await waitFor(() =>
            expect(
                screen.queryByText('Reset Email sent successfully')
            ).toBeTruthy()
        )
    })

    it('screen switches on email send', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <ForgottenPasswordScreen />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('Account Email'), {
                target: { value: 'test@email.ac.uk' },
            })
        })

        fireEvent.click(screen.getByText('Send recovery email'))

        await waitFor(() => {
            expect(
                screen.queryByText(
                    'Please check your email to reset your password'
                )
            ).toBeTruthy()
            expect(screen.queryByText('Retry')).toBeTruthy()
        })
    })

    it('retry button sends email', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <ForgottenPasswordScreen />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('Account Email'), {
                target: { value: 'test@email.ac.uk' },
            })
        })

        fireEvent.click(screen.getByText('Send recovery email'))

        await waitFor(() => {
            expect(screen.queryByText('Retry')).toBeTruthy()
        })

        fireEvent.click(screen.getByText('Retry'))

        await waitFor(() =>
            expect(
                screen.queryAllByText('Reset Email sent successfully').length
            ).toBe(2)
        )
    })
})
