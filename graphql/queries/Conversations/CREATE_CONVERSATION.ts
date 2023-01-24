import { gql } from '@apollo/client'

export const CREATE_CONVERSATION = gql`
    mutation MyMutation($userOneId: String!, $userTwoId: String!) {
        CreateConversation(userOneId: $userOneId, userTwoId: $userTwoId) {
            id
        }
    }
`
