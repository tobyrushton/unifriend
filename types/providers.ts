import React from 'react'
import { UserObjectWithID } from './User'

export interface userContextInterface {
    user: UserObjectWithID
}

export type children = {
    children: React.ReactNode
}
