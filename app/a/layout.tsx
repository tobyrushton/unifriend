'use client'

import { FC } from 'react'
import { ChildrenProps } from '../../types'
import { Navbar } from '../../components'

const AuthorisedLayout: FC<ChildrenProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default AuthorisedLayout
