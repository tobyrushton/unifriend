import { useContext } from 'react'
import { UserContext } from '../../components/providers/UserProvider'
import { UserContextInterface } from '../../types'

export const useUser = (): UserContextInterface =>
    useContext(UserContext) as UserContextInterface
