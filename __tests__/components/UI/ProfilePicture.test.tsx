import { render } from '@testing-library/react'
import { ProfilePicture } from '../../../components'

describe('ProfilePicture', () => {
    it('should render correctly', () => {
        const { container } = render(
            <ProfilePicture
                image="/Profile-picture.png"
                width={100}
                height={100}
            />
        )
        expect(container).toMatchSnapshot()
    })
})
