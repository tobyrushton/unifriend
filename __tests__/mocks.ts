Object.defineProperty(document, 'documentElement', {
    value: {
        getAttribute: () => 'light',
        setAttribute: jest.fn(),
    },
})

export {}
