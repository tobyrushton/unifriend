import { gql } from '@apollo/client'

export const GET_CONVERSATION = gql`
    query MyQuery($userOneId: String!, $userTwoId: String!) {
        getConversation(userOneId: $userOneId, userTwoId: $userTwoId) {
            id
        }
    }
`
