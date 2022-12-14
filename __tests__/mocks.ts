import { useRouter } from 'next/navigation'
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

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        router: {
            push: jest.fn(),
        },
    })),
    usePathname: jest.fn(),
}))

jest.mock('../lib/supabase', () => ({
    supabase: {
        auth: {
            getSession: jest.fn(),
            onAuthStateChange: jest.fn(),
            signInWithPassword: jest.fn(),
            signUp: jest.fn(),
            update: jest.fn(),
            resetPasswordForEmail: jest.fn(),
        },
        storage: {
            from: jest.fn(() => ({
                getPublicUrl: jest.fn(() => ({
                    data: {
                        publicUrl: '/Profile-picture.png',
                    },
                })),
            })),
        },
    },
}))
;(useRouter as jest.Mock).mockReturnValue({
    push: (path: string) => window.history.pushState({}, '', path),
})
