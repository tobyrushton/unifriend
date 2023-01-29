import { render, screen, act, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { User } from '../../../components'
import { UserObjectWithID } from '../../../types'
import { ProviderStack } from '../../__helpers__/ProviderStack'
import '@testing-library/jest-dom'

const bio = // eslint-disable-next-line max-len
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,.'

const user: UserObjectWithID = {
    id: '123',
    firstName: 'Toby',
    lastName: 'Rushton',
    email: '',
    course: 'Computer Science',
    birthday: '2005-06-12',
    username: 'tobyrushton',
    bio,
    university: 'University of Test',
}

// This is a test for the User component
describe('User', () => {
    it('should render', () => {
        const { container } = render(
            <User user={user} getNewUser={jest.fn()} />
        )
        expect(container).toMatchSnapshot()
    })
    it('should render correct user information', () => {
        render(<User user={user} getNewUser={jest.fn()} />)
        expect(screen.getByText('Toby Rushton')).toBeInTheDocument()
        expect(screen.getByText('📚 Computer Science')).toBeInTheDocument()
        expect(screen.getByText('🎓 University of Test')).toBeInTheDocument()
        expect(screen.getByText('🎂 17 years old')).toBeInTheDocument()
        expect(screen.getByText(bio)).toBeInTheDocument()
    })
    it('should render popup', async () => {
        const { getByText } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <User user={user} getNewUser={jest.fn()} />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        const button = getByText('Toby Rushton')
        act(() => button.click())
        expect(getByText('Send friend request?')).toBeInTheDocument()
    })
    it('should render popup and send friend request', async () => {
        const { getByText } = await act(async () =>
            render(
                <MockedProvider>
                    <ProviderStack>
                        <User user={user} getNewUser={jest.fn()} />
                    </ProviderStack>
                </MockedProvider>
            )
        )
        const button = getByText('Toby Rushton')
        act(() => button.click())
        expect(getByText('Send friend request?')).toBeInTheDocument()
        const sendButton = getByText('Send')
        act(() => sendButton.click())
        waitFor(() =>
            expect(getByText('Friend request sent')).toBeInTheDocument()
        )
    })
})
