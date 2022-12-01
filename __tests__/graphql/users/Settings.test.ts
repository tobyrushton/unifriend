import { Context } from '@apollo/client'
import { ApolloServer } from 'apollo-server-micro'
import { createMockContext, MockContext } from '../../__helpers__/context'
import { schema } from '../../../graphql/schema'
import { resolvers } from '../../../graphql/resolvers'
import { UpdateSettingsMutation } from '../../../graphql/queries/UpdateSettingsMutation'

describe('Settings tests', () => {
    let mockCtx: MockContext
    let ctx: Context
    let ApolloMockServer: ApolloServer

    beforeEach(() => {
        mockCtx = createMockContext()
        ctx = mockCtx as unknown as Context
        ApolloMockServer = new ApolloServer({
            schema,
            context: ctx,
            resolvers,
        })
    })

    it('should update users settings', async () => {
        mockCtx.prisma.settings.update.mockResolvedValue({
            darkMode: true,
            universityPreference: 'ALL',
            usersId: '12342',
            id: '12',
        })

        const response = await ApolloMockServer.executeOperation({
            query: UpdateSettingsMutation,
            variables: {
                id: '12342',
                darkMode: true,
                universityPreference: 'ALL',
            },
        })

        expect(response.data?.UpdateSettings).toEqual({
            darkMode: true,
            universityPreference: 'ALL',
        })
    })
})
