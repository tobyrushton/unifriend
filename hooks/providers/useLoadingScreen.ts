import { useContext } from 'react'
import { LoadingContext } from '../../components/providers/LoadingProvider'
import { LoadingContextInterface } from '../../types'

export const useLoadingScreen = (): LoadingContextInterface =>
    useContext(LoadingContext) as LoadingContextInterface
