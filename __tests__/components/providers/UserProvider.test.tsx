import { render, screen } from '@testing-library/react'
import { FC } from 'react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { usePathname } from 'next/navigation'
import { act } from 'react-dom/test-utils'
import { useUser } from '../../../hooks'
import {
    UserProvider,
    NotificationProvider,
    LoadingProvider,
} from '../../../components'
import { GET_USER_BY_EMAIL } from '../../../graphql/queries'

const ProviderTestComponent: FC = () => {
    const { user } = useUser()

    return (
        <ul>
            <li data-testid="firstName">{user.firstName}</li>
            <li data-testid="id">{user.id}</li>
            <li data-testid="university">{user.university}</li>
        </ul>
    )
}

describe('User Provider tests', () => {
    /* eslint-disable-next-line */
    let mocks: MockedResponse<Record<string, any>>[] = []
    const supabaseAuthMock = jest.requireMock('../../../lib/supabase').supabase
        .auth
    supabaseAuthMock.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
    })

    it('children can consume context', async () => {
        await act(async () => {
            render(
                <MockedProvider mocks={mocks}>
                    <LoadingProvider>
                        <NotificationProvider>
                            <UserProvider>
                                <ProviderTestComponent />
                            </UserProvider>
                        </NotificationProvider>
                    </LoadingProvider>
                </MockedProvider>
            )
        })

        expect(screen.queryByTestId('firstName')?.innerHTML).toBe('')
        expect(screen.queryByTestId('id')?.innerHTML).toBe('')
        expect(screen.queryByTestId('university')?.innerHTML).toBe('')
    })

    it('can fetch user data', async () => {
        supabaseAuthMock.getSession.mockReturnValue({
            data: { session: { user: { email: 'test@email.ac.uk' } } },
        })

        mocks = [
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
                            id: '23',
                            firstName: 'Toby',
                            lastName: 'Rushton',
                            course: 'Computer Science',
                            email: 'test@email.ac.uk',
                            university: 'test university',
                            username: 'toby',
                            bio: '',
                            birthday: '2005-06-12',
                            settings: {
                                darkMode: false,
                                universityPreference: 'OWN',
                            },
                        },
                    },
                },
            },
        ]

        await act(async () => {
            render(
                <MockedProvider mocks={mocks}>
                    <LoadingProvider>
                        <NotificationProvider>
                            <UserProvider>
                                <ProviderTestComponent />
                            </UserProvider>
                        </NotificationProvider>
                    </LoadingProvider>
                </MockedProvider>
            )
        })

        expect(screen.queryByTestId('firstName')?.innerHTML).toBe('Toby')
        expect(screen.queryByTestId('id')?.innerHTML).toBe('23')
        expect(screen.queryByTestId('university')?.innerHTML).toBe(
            'test university'
        )
    })

    it('reroutes path based on to login', async () => {
        supabaseAuthMock.getSession.mockReturnValue({ data: { session: null } })
        ;(usePathname as jest.Mock).mockReturnValue('/a')
        await act(async () => {
            render(
                <MockedProvider mocks={mocks}>
                    <LoadingProvider>
                        <NotificationProvider>
                            <UserProvider>
                                <ProviderTestComponent />
                            </UserProvider>
                        </NotificationProvider>
                    </LoadingProvider>
                </MockedProvider>
            )
        })

        expect(window.location.pathname).toBe('/')
    })

    it('reroutes path to authorised', async () => {
        supabaseAuthMock.getSession.mockReturnValue({
            data: { session: { user: { email: 'test@email.ac.uk' } } },
        })
        ;(usePathname as jest.Mock).mockReturnValue('/')
        await act(async () => {
            render(
                <MockedProvider mocks={mocks}>
                    <LoadingProvider>
                        <NotificationProvider>
                            <UserProvider>
                                <ProviderTestComponent />
                            </UserProvider>
                        </NotificationProvider>
                    </LoadingProvider>
                </MockedProvider>
            )
        })

        expect(window.location.pathname).toBe('/a')
    })
})
