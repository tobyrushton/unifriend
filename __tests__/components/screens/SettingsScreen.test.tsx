import { render, act, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { ProviderStack } from '../../__helpers__/ProviderStack'
import { SlideOne, SlideTwo, SlideThree } from '../../../components'
import {
    UPDATE_SETTINGS,
    CHECK_USERNAME_IS_TAKEN,
    UPDATE_USER,
    GET_USER_BY_EMAIL,
} from '../../../graphql/queries'
import '@testing-library/jest-dom'

// unit tests for slide one
describe('SlideOne', () => {
    it('should render', async () => {
        const { container } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <SlideOne />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        expect(container).toBeTruthy()
    })
    it('should render the correct text', async () => {
        const { getByText } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <SlideOne />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        expect(getByText('Set colour theme')).toBeTruthy()
        expect(getByText('Light')).toBeTruthy()
        expect(getByText('Dark')).toBeTruthy()
    })
    it('should render the toggle', async () => {
        const { getByLabelText } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <SlideOne />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        expect(getByLabelText('Toggle')).toBeInTheDocument()
    })
    it('should update the theme', async () => {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query: UPDATE_SETTINGS,
                    variables: {
                        darkMode: true,
                        id: '',
                    },
                },
                result: {
                    data: {
                        UpdateSettings: {
                            darkMode: true,
                            universityPreference: 'OWN',
                        },
                    },
                },
            },
        ]
        const { getByLabelText, queryByText } = await act(async () =>
            render(
                <MockedProvider mocks={mocks}>
                    <ProviderStack>
                        <SlideOne />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        const toggle = getByLabelText('Toggle')
        act(() => {
            toggle.click()
        })
        expect(toggle).toBeChecked()
        await waitFor(() => {
            expect(
                queryByText('Colour mode updated successfully')
            ).toBeInTheDocument()
        })
    })
})

// unit tests for slide two
describe('SlideTwo', () => {
    it('should render correctly', async () => {
        const { container } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <SlideTwo />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        expect(container).toBeTruthy()
    })
    it('should render correct text', async () => {
        const { getByText } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <SlideTwo />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        expect(getByText('Set university preference')).toBeTruthy()
        expect(getByText('Own university only')).toBeTruthy()
        expect(getByText('All UK universities')).toBeTruthy()
    })
    it('should render toggle', async () => {
        const { getByLabelText } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <SlideTwo />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        expect(getByLabelText('Toggle')).toBeInTheDocument()
    })
    it('should update the university preference', async () => {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query: UPDATE_SETTINGS,
                    variables: {
                        id: '',
                        universityPreference: 'ALL',
                    },
                },
                result: {
                    data: {
                        UpdateSettings: {
                            universityPreference: 'ALL',
                            darkMode: false,
                        },
                    },
                },
            },
        ]
        const { getByLabelText, queryByText } = await act(async () =>
            render(
                <MockedProvider mocks={mocks}>
                    <ProviderStack>
                        <SlideTwo />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        const toggle = getByLabelText('Toggle')
        act(() => {
            toggle.click()
        })
        expect(toggle).toBeChecked()
        await waitFor(() => {
            expect(
                queryByText('University preference updated successfully')
            ).toBeInTheDocument()
        })
    })
})

// unit tests for slide three
describe('SlideThree', () => {
    it('should render correctly', async () => {
        const { container } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <SlideThree />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        expect(container).toBeTruthy()
    })
    it('should render correct text', async () => {
        const { getByText } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <SlideThree />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        expect(getByText('Update account information')).toBeInTheDocument()
        expect(getByText('Profile Picture')).toBeInTheDocument()
        expect(getByText('Name')).toBeInTheDocument()
        expect(getByText('Username')).toBeInTheDocument()
        expect(getByText('Course')).toBeInTheDocument()
        expect(getByText('Bio')).toBeInTheDocument()
        expect(getByText('Update')).toBeInTheDocument()
    })
    it('should render input', async () => {
        const { getByPlaceholderText } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <SlideThree />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        expect(getByPlaceholderText('username')).toBeInTheDocument()
        expect(getByPlaceholderText('First Name')).toBeInTheDocument()
        expect(getByPlaceholderText('Last Name')).toBeInTheDocument()
        expect(getByPlaceholderText('Course')).toBeInTheDocument()
        expect(getByPlaceholderText('Bio')).toBeInTheDocument()
    })
    it('should update the username', async () => {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query: UPDATE_USER,
                    variables: {
                        username: 'test',
                        id: '',
                    },
                },
                result: {
                    data: {
                        updateUser: {
                            username: 'test',
                            birthday: '',
                            course: '',
                            bio: '',
                            firstName: '',
                            lastName: '',
                            university: '',
                            id: '',
                        },
                    },
                },
            },
        ]
        const { getByText, getByPlaceholderText, queryByText } = await act(
            async () =>
                render(
                    <MockedProvider mocks={mocks}>
                        <ProviderStack>
                            <SlideThree />
                        </ProviderStack>
                    </MockedProvider>
                )
        )
        const input = getByPlaceholderText('username')
        const button = getByText('Update')
        act(() => {
            fireEvent.change(input, { target: { value: 'test' } })
            fireEvent.click(button)
        })

        expect(input).toHaveValue('test')
        await waitFor(() => {
            expect(
                queryByText('Account details updated successfully')
            ).toBeInTheDocument()
        })
    })
    it('should update the first name', async () => {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query: UPDATE_USER,
                    variables: {
                        firstName: 'test',
                        id: '',
                    },
                },
                result: {
                    data: {
                        updateUser: {
                            username: '',
                            birthday: '',
                            course: '',
                            bio: '',
                            firstName: 'test',
                            lastName: '',
                            university: '',
                            id: '',
                        },
                    },
                },
            },
        ]
        const { getByText, getByPlaceholderText, queryByText } = await act(
            async () =>
                render(
                    <MockedProvider mocks={mocks}>
                        <ProviderStack>
                            <SlideThree />
                        </ProviderStack>
                    </MockedProvider>
                )
        )
        const input = getByPlaceholderText('First Name')
        const button = getByText('Update')
        act(() => {
            fireEvent.change(input, { target: { value: 'test' } })
            fireEvent.click(button)
        })

        expect(input).toHaveValue('test')
        await waitFor(() => {
            expect(
                queryByText('Account details updated successfully')
            ).toBeInTheDocument()
        })
    })
    it('should update the last name', async () => {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query: UPDATE_USER,
                    variables: {
                        lastName: 'test',
                        id: '',
                    },
                },
                result: {
                    data: {
                        updateUser: {
                            username: '',
                            birthday: '',
                            course: '',
                            bio: '',
                            firstName: '',
                            lastName: 'test',
                            university: '',
                            id: '',
                        },
                    },
                },
            },
        ]
        const { getByText, getByPlaceholderText, queryByText } = await act(
            async () =>
                render(
                    <MockedProvider mocks={mocks}>
                        <ProviderStack>
                            <SlideThree />
                        </ProviderStack>
                    </MockedProvider>
                )
        )
        const input = getByPlaceholderText('Last Name')
        const button = getByText('Update')
        act(() => {
            fireEvent.change(input, { target: { value: 'test' } })
            fireEvent.click(button)
        })

        expect(input).toHaveValue('test')
        await waitFor(() => {
            expect(
                queryByText('Account details updated successfully')
            ).toBeInTheDocument()
        })
    })
    it('should update the course', async () => {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query: UPDATE_USER,
                    variables: {
                        course: 'test',
                        id: '',
                    },
                },
                result: {
                    data: {
                        updateUser: {
                            username: '',
                            birthday: '',
                            course: 'test',
                            bio: '',
                            firstName: '',
                            lastName: '',
                            university: '',
                            id: '',
                        },
                    },
                },
            },
        ]
        const { getByText, getByPlaceholderText, queryByText } = await act(
            async () =>
                render(
                    <MockedProvider mocks={mocks}>
                        <ProviderStack>
                            <SlideThree />
                        </ProviderStack>
                    </MockedProvider>
                )
        )
        const input = getByPlaceholderText('Course')
        const button = getByText('Update')
        act(() => {
            fireEvent.change(input, { target: { value: 'test' } })
            fireEvent.click(button)
        })

        expect(input).toHaveValue('test')
        await waitFor(() => {
            expect(
                queryByText('Account details updated successfully')
            ).toBeInTheDocument()
        })
    })
    it('should update the bio', async () => {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query: UPDATE_USER,
                    variables: {
                        bio: 'test',
                        id: '',
                    },
                },
                result: {
                    data: {
                        updateUser: {
                            username: '',
                            birthday: '',
                            course: '',
                            bio: 'test',
                            firstName: '',
                            lastName: '',
                            university: '',
                            id: '',
                        },
                    },
                },
            },
        ]
        const { getByText, getByPlaceholderText, queryByText } = await act(
            async () =>
                render(
                    <MockedProvider mocks={mocks}>
                        <ProviderStack>
                            <SlideThree />
                        </ProviderStack>
                    </MockedProvider>
                )
        )
        const input = getByPlaceholderText('Bio')
        const button = getByText('Update')
        act(() => {
            fireEvent.change(input, { target: { value: 'test' } })
            fireEvent.click(button)
        })

        expect(input).toHaveValue('test')
        await waitFor(() => {
            expect(
                queryByText('Account details updated successfully')
            ).toBeInTheDocument()
        })
    })
    it('should not update username if taken', async () => {
        const mocks: MockedResponse[] = [
            {
                request: {
                    query: CHECK_USERNAME_IS_TAKEN,
                    variables: {
                        username: 'test',
                    },
                },
                result: {
                    data: {
                        CheckUsernameIsTaken: true,
                    },
                },
            },
        ]
        const { getByText, getByPlaceholderText, queryByText } = await act(
            async () =>
                render(
                    <MockedProvider mocks={mocks}>
                        <ProviderStack>
                            <SlideThree />
                        </ProviderStack>
                    </MockedProvider>
                )
        )
        const input = getByPlaceholderText('username')
        const button = getByText('Update')
        act(() => {
            fireEvent.change(input, { target: { value: 'test' } })
        })
        expect(input).toHaveValue('test')
        await waitFor(() => {
            expect(queryByText('Username is taken')).toBeInTheDocument()
            expect(
                queryByText('Account details updated successfully')
            ).not.toBeInTheDocument()
        })
        act(() => {
            button.click()
        })
        expect(button).toBeDisabled()
        await waitFor(() => {
            expect(queryByText('Username is taken')).toBeInTheDocument()
            expect(
                queryByText('Account details updated successfully')
            ).not.toBeInTheDocument()
        })
    })
    it('should render with fetched user data', async () => {
        const supabaseAuthMock = jest.requireMock('../../../lib/supabase')
            .supabase.auth
        supabaseAuthMock.onAuthStateChange.mockReturnValue({
            data: { subscription: { unsubscribe: jest.fn() } },
        })
        supabaseAuthMock.getSession.mockReturnValue({
            data: { session: { user: { email: 'test@email.ac.uk' } } },
        })

        const mocks: MockedResponse[] = [
            {
                request: {
                    query: GET_USER_BY_EMAIL,
                    variables: {
                        email: 'test@email.ac.uk',
                    },
                },
                result: {
                    data: {
                        getUserFromAuth: {
                            username: 'testusername',
                            birthday: '2005-06-12',
                            course: 'Computer Science',
                            bio: 'Hello World!',
                            firstName: 'Toby',
                            lastName: 'Rushton',
                            university: 'test university',
                            id: '1234567',
                            settings: {
                                darkMode: false,
                                universityPreference: 'OWN',
                            },
                            email: 'test@email.ac.uk',
                            friends: [],
                        },
                    },
                },
            },
        ]
        const { queryByPlaceholderText } = await act(async () =>
            render(
                <MockedProvider mocks={mocks}>
                    <ProviderStack>
                        <SlideThree />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        expect(queryByPlaceholderText('First Name')).toHaveValue('Toby')
        expect(queryByPlaceholderText('Last Name')).toHaveValue('Rushton')
        expect(queryByPlaceholderText('username')).toHaveValue('testusername')
        expect(queryByPlaceholderText('Bio')).toHaveValue('Hello World!')
        expect(queryByPlaceholderText('Course')).toHaveValue('Computer Science')
    })
})
