import { useContext } from 'react'
import { MessageContextInterface } from '../../types'
import { MessagingContext } from '../../components/providers/MessagingProvider'

export const useMessages = (): MessageContextInterface =>
    useContext(MessagingContext) as MessageContextInterface
