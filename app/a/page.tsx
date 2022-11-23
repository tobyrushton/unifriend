'use client'

import { FC } from 'react'
import { useSignOut } from '../../hooks'
import { Button } from '../../components'

const A: FC = () => {
    const { response } = useSignOut()
    return (
        <div>
            <Button onClick={() => response(undefined, undefined)}>
                Sign Out
            </Button>
        </div>
    )
}

export default A
