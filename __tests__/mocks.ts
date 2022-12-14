import { colors } from '../styles/reusables/colors'

Object.defineProperty(document, 'documentElement', {
    value: {
        getAttribute: () => 'light',
        setAttribute: jest.fn(),
    },
})

jest.mock('../hooks/providers/useTheme', () => ({
    useTheme: jest.fn(() => ({
        theme: colors.light,
    })),
}))
