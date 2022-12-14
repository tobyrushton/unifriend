import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ProviderStack } from '../../__helpers__/ProviderStack'
import { AuthScreen } from '../../../components'
import { CHECK_USERNAME_IS_TAKEN, CREATE_USER } from '../../../graphql/queries'

describe('AuthScreen tests', () => {
    let exited = false
    const changeAuth = (): void => {
        exited = true
    }

    beforeEach(() => {
        exited = false
    })

    const supabaseAuthMock = jest.requireMock('../../../lib/supabase').supabase
        .auth
    supabaseAuthMock.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
    })

    it('screen renders for logIn', async () => {
        const { container } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen logIn changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        expect(container).toBeTruthy()
    })

    it('screen renders for signUp', async () => {
        const { container } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        expect(container).toBeTruthy()
    })

    it('all sign in components exist', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen logIn changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        expect(screen.queryByPlaceholderText('Username or email')).toBeTruthy()
        expect(screen.queryByPlaceholderText('Password')).toBeTruthy()
        expect(screen.queryByText('Sign In')).toBeTruthy()
        expect(screen.queryByText('Forgot your password?')).toBeTruthy()

        fireEvent.click(screen.getByText('Sign In'))
        expect(screen.getByText('Sign In')).toBeTruthy()
    })

    it('can exit sign in', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen logIn changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        fireEvent.click(screen.getAllByRole('button')[0])
        expect(exited).toBeTruthy()
    })

    it('can exit sign up', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        fireEvent.click(screen.getAllByRole('button')[0])
        expect(exited).toBeTruthy()
    })

    it('can enter text on sign in', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen logIn changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('Username or email'), {
                target: { value: 'test@email.com' },
            })
            fireEvent.input(screen.getByPlaceholderText('Password'), {
                target: { value: 'test1234' },
            })
        })
        expect(screen.queryByDisplayValue(/^test@email.com$/i)).toBeTruthy()
        expect(screen.queryByDisplayValue(/^test1234$/i)).toBeTruthy()
    })

    it('forgot password screen displays', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen logIn changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        expect(screen.queryByText('Forgot your password?')).toBeTruthy()
        await act(async () => {
            fireEvent.click(screen.getByText('Forgot your password?'))
        })
        expect(screen.queryByPlaceholderText('Account Email')).toBeTruthy()
        expect(screen.queryByText('Enter account email')).toBeTruthy()
        expect(screen.queryByText('Send recovery email')).toBeTruthy()
    })

    it('all sign up components exist', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        expect(screen.queryByPlaceholderText('First Name')).toBeTruthy()
        expect(screen.queryByPlaceholderText('Last Name')).toBeTruthy()
        expect(screen.queryByPlaceholderText('University Email')).toBeTruthy()
        expect(screen.queryByText('Next')).toBeTruthy()
    })

    it('cant click next on sign up without all fields being filled', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.click(screen.getByText('Next'))
        })

        expect(screen.queryByPlaceholderText('First Name')).toBeTruthy()
        expect(screen.queryByPlaceholderText('Last Name')).toBeTruthy()
        expect(screen.queryByPlaceholderText('University Email')).toBeTruthy()
        expect(screen.queryByText('Next')).toBeTruthy()
    })

    it('displays error text on invalid email', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('University Email'), {
                target: { value: 'test@email.com' },
            })
        })

        expect(screen.queryByDisplayValue('test@email.com')).toBeTruthy()
        expect(
            screen.queryByText('Please enter a valid UK univeristy email.')
        ).toBeTruthy()
    })

    it('can go to second slide on sign up', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('University Email'), {
                target: { value: 'test@kcl.ac.uk' },
            })
            fireEvent.input(screen.getByPlaceholderText('First Name'), {
                target: { value: 'Toby' },
            })
            fireEvent.input(screen.getByPlaceholderText('Last Name'), {
                target: { value: 'Rushton' },
            })
        })

        fireEvent.click(screen.getByText('Next'))
        expect(screen.queryByPlaceholderText('First Name')).toBeFalsy()
        expect(screen.queryByPlaceholderText('Last Name')).toBeFalsy()
        expect(screen.queryByPlaceholderText('University Email')).toBeFalsy()
        expect(screen.queryByPlaceholderText('Username')).toBeTruthy()
        expect(screen.queryByPlaceholderText('Password')).toBeTruthy()
        expect(screen.queryByText('Back')).toBeTruthy()
    })

    it('input values maintained when moving between slides', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('University Email'), {
                target: { value: 'test@kcl.ac.uk' },
            })
            fireEvent.input(screen.getByPlaceholderText('First Name'), {
                target: { value: 'Toby' },
            })
            fireEvent.input(screen.getByPlaceholderText('Last Name'), {
                target: { value: 'Rushton' },
            })
        })
        fireEvent.click(screen.getByText('Next'))
        expect(screen.queryByPlaceholderText('University Email')).toBeFalsy()
        fireEvent.click(screen.getByText('Back'))
        expect(screen.queryByDisplayValue('test@kcl.ac.uk')).toBeTruthy()
        expect(screen.queryByDisplayValue('Toby')).toBeTruthy()
        expect(screen.queryByDisplayValue('Rushton')).toBeTruthy()
    })

    it('error text displays on second slide on sign up', async () => {
        await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('University Email'), {
                target: { value: 'test@kcl.ac.uk' },
            })
            fireEvent.input(screen.getByPlaceholderText('First Name'), {
                target: { value: 'Toby' },
            })
            fireEvent.input(screen.getByPlaceholderText('Last Name'), {
                target: { value: 'Rushton' },
            })
        })
        fireEvent.click(screen.getByText('Next'))
        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('Username'), {
                target: { value: 'toby@123' },
            })
            fireEvent.input(screen.getByPlaceholderText('Password'), {
                target: { value: 'pass123' },
            })
        })

        expect(
            screen.queryByText(
                'Password must contain a special character, a number and an upper case letter.'
            )
        ).toBeTruthy()
        expect(
            screen.queryByText('Username must contain no special characters')
        ).toBeTruthy()
    })

    it('can identify taken username', async () => {
        /* eslint-disable-next-line */
          const mocks:MockedResponse<Record<string, any>>[] = [
            {
                request: {
                    query: CHECK_USERNAME_IS_TAKEN,
                    variables: {
                        username: 'toby',
                    },
                },
                result: {
                    data: {
                        CheckUsernameIsTaken: true,
                    },
                },
            },
        ]

        await act(async () =>
            render(
                <MockedProvider mocks={mocks}>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('University Email'), {
                target: { value: 'test@kcl.ac.uk' },
            })
            fireEvent.input(screen.getByPlaceholderText('First Name'), {
                target: { value: 'Toby' },
            })
            fireEvent.input(screen.getByPlaceholderText('Last Name'), {
                target: { value: 'Rushton' },
            })
        })

        fireEvent.click(screen.getByText('Next'))
        expect(screen.queryByText('Next')).toBeTruthy()

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('Username'), {
                target: { value: 'toby' },
            })
        })
        expect(screen.queryByText('Username is taken')).toBeTruthy()
    })

    it('can go to third slide on sign up', async () => {
        /* eslint-disable-next-line */
        const mocks:MockedResponse<Record<string, any>>[] = [
            {
                request: {
                    query: CHECK_USERNAME_IS_TAKEN,
                    variables: {
                        username: 'toby',
                    },
                },
                result: {
                    data: {
                        CheckUsernameIsTaken: false,
                    },
                },
            },
        ]

        await act(async () =>
            render(
                <MockedProvider mocks={mocks}>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('University Email'), {
                target: { value: 'test@kcl.ac.uk' },
            })
            fireEvent.input(screen.getByPlaceholderText('First Name'), {
                target: { value: 'Toby' },
            })
            fireEvent.input(screen.getByPlaceholderText('Last Name'), {
                target: { value: 'Rushton' },
            })
        })

        fireEvent.click(screen.getByText('Next'))
        expect(screen.queryByText('Next')).toBeTruthy()

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('Username'), {
                target: { value: 'toby' },
            })
            fireEvent.input(screen.getByPlaceholderText('Password'), {
                target: { value: 'PaSs1234!' },
            })
        })
        fireEvent.click(screen.getByText('Next'))
        expect(screen.queryByPlaceholderText('Course')).toBeTruthy()
        expect(screen.queryByText('Sign Up')).toBeTruthy()
    })

    it('can sign up', async () => {
        /* eslint-disable-next-line */
                const mocks:MockedResponse<Record<string, any>>[] = [
            {
                request: {
                    query: CHECK_USERNAME_IS_TAKEN,
                    variables: {
                        username: 'toby',
                    },
                },
                result: {
                    data: {
                        CheckUsernameIsTaken: false,
                    },
                },
            },
            {
                request: {
                    query: CREATE_USER,
                    variables: {
                        firstName: 'Toby',
                        lastName: 'Rushton',
                        email: 'test@kcl.ac.uk',
                        university: 'Kings College London',
                        course: 'Computer Science',
                        birthday: '2005-06-12',
                        username: 'toby',
                    },
                },
                result: {
                    data: {
                        createUser: {
                            firstName: 'Toby',
                            lastName: 'Rushton',
                            email: 'test@kcl.ac.uk',
                            university: 'Kings College London',
                            course: 'Computer Science',
                            birthday: '2005-06-12',
                            username: 'toby',
                            bio: '',
                            settings: null,
                        },
                    },
                },
            },
        ]

        supabaseAuthMock.signUp.mockResolvedValue({
            data: undefined,
            error: undefined,
        })

        await act(async () =>
            render(
                <MockedProvider mocks={mocks}>
                    <ProviderStack>
                        <AuthScreen signUp changeAuth={changeAuth} />
                    </ProviderStack>
                </MockedProvider>
            )
        )

        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('University Email'), {
                target: { value: 'test@kcl.ac.uk' },
            })
            fireEvent.input(screen.getByPlaceholderText('First Name'), {
                target: { value: 'Toby' },
            })
            fireEvent.input(screen.getByPlaceholderText('Last Name'), {
                target: { value: 'Rushton' },
            })
        })
        fireEvent.click(screen.getByText('Next'))
        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('Username'), {
                target: { value: 'toby' },
            })
            fireEvent.input(screen.getByPlaceholderText('Password'), {
                target: { value: 'PaSs1234!' },
            })
        })
        fireEvent.click(screen.getByText('Next'))
        await act(async () => {
            fireEvent.input(screen.getByPlaceholderText('Course'), {
                target: { value: 'Computer Science' },
            })
            fireEvent.input(screen.getByPlaceholderText('Birthday'), {
                target: { value: '2005-06-12' },
            })
        })
        fireEvent.click(screen.getByText('Sign Up'))

        await waitFor(() =>
            expect(
                screen.queryByText('Account created successfully.')
            ).toBeTruthy()
        )
    })
})
