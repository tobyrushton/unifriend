import { useContext } from 'react'
import { UserContext } from '../../components/providers/UserProvider'
import { userContextInterface } from '../../types'

export const useUser = (): userContextInterface =>
    useContext(UserContext) as userContextInterface
