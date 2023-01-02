import { ApolloServer } from '@apollo/server'
import { createMockContext, MockContext } from '../../__helpers__/context'
import { schema } from '../../../graphql/schema'
import { UPDATE_SETTINGS } from '../../../graphql/queries'
import { Settings } from '../../../types'
import { Response } from '../../__helpers__/types'

describe('Settings tests', () => {
    let mockCtx: MockContext
    let ApolloMockServer: ApolloServer

    beforeEach(() => {
        mockCtx = createMockContext()
        ApolloMockServer = new ApolloServer({
            schema,
        })
    })

    it('should update users settings', async () => {
        mockCtx.prisma.settings.update.mockResolvedValue({
            darkMode: true,
            universityPreference: 'ALL',
            usersId: '12342',
            id: '12',
        })

        const response = await ApolloMockServer.executeOperation<{
            UpdateSettings: Settings
        }>(
            {
                query: UPDATE_SETTINGS,
                variables: {
                    id: '12342',
                    darkMode: true,
                    universityPreference: 'ALL',
                },
            },
            {
                contextValue: mockCtx,
            }
        )

        expect(
            (response as unknown as Response<{ UpdateSettings: Settings }>).body
                .singleResult.data?.UpdateSettings
        ).toEqual({
            darkMode: true,
            universityPreference: 'ALL',
        })
    })
})
