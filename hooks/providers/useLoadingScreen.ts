import { useContext } from 'react'
import { LoadingContext } from '../../components'
import { LoadingContextInterface } from '../../types'

export const useLoadingScreen = (): LoadingContextInterface =>
    useContext(LoadingContext) as LoadingContextInterface
