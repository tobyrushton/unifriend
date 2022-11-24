import { ApolloServer } from 'apollo-server-micro'
import { GraphQLFormattedError } from 'graphql'
import { MockContext, Context, createMockContext } from './__helpers__/context'
import { schema } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { UserObjectWithID } from '../types'
import {
    CreateUserMutation,
    UpdateUserMutation,
    UserByEmailQuery,
    UserByIDQuery,
    GetAuthFromUsername,
} from '../graphql/queries'

describe('user query tests', () => {
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

    const failedUser: UserObjectWithID = {
        id: '1234817245dshfjsahdfa34',
        email: 'testEmail@email.com',
        firstName: 'Toby',
        lastName: 'Rushton',
        birthday: '12062005',
        course: 'Computer Science',
        university: 'UCL',
        username: 'tobyrushton',
        bio: '',
    }

    const userObject: UserObjectWithID = {
        id: '1234817245dshfjsahdfa34',
        email: 'testEmail@kcl.ac.uk',
        firstName: 'Toby',
        lastName: 'Rushton',
        birthday: '12062005',
        course: 'Computer Science',
        university: 'UCL',
        username: 'tobyrushton',
        bio: '',
    }

    it('should fail with missing variable', async () => {
        const response = await ApolloMockServer.executeOperation({
            query: UserByIDQuery,
            variables: {
                firstName: true,
                lastName: true,
            },
        })

        expect(response.errors?.toString()).toBe(
            `Variable "$id" of required type "String!" was not provided.`
        )
    })

    it('should fail with invalid email on create user', async () => {
        const response = await ApolloMockServer.executeOperation({
            query: CreateUserMutation,
            variables: failedUser,
        })

        expect(
            (response.errors as unknown as GraphQLFormattedError[])[0].message
        ).toEqual('Email is not valid. Please enter a valid university email')
    })

    it('should fail with invalid username on update user', async () => {
        const response = await ApolloMockServer.executeOperation({
            query: UpdateUserMutation,
            variables: {
                id: failedUser.id,
                username: 't%df',
            },
        })

        expect(
            (response.errors as unknown as GraphQLFormattedError[])[0].message
        ).toEqual(
            'Username is not valid. Please ensure it contains no special characters'
        )
    })

    it('should create new user', async () => {
        mockCtx.prisma.users.create.mockResolvedValue(userObject)

        const response = await ApolloMockServer.executeOperation({
            query: CreateUserMutation,
            variables: userObject,
        })
        expect(response.data?.createUser).toEqual({
            email: 'testEmail@kcl.ac.uk',
            firstName: 'Toby',
            lastName: 'Rushton',
            birthday: '12062005',
            course: 'Computer Science',
            university: 'UCL',
            username: 'tobyrushton',
            bio: '',
            settings: null,
        })
    })

    it('should fail to create new user', async () => {
        const failUser = {
            firstName: 'Toby',
            lastName: 'Rushton',
            birthday: '12062005',
            university: 'KCL',
        }

        const response = await ApolloMockServer.executeOperation({
            query: CreateUserMutation,
            variables: failUser,
        })

        expect(Boolean(response.errors)).toBe(true)
    })

    it('should update users username', async () => {
        const user = { ...userObject }
        user.username = 'tobyrushton1'
        mockCtx.prisma.users.update.mockResolvedValue(user)

        const response = await ApolloMockServer.executeOperation({
            query: UpdateUserMutation,
            variables: {
                id: user.id,
                username: user.username,
            },
        })

        expect(response.data?.updateUser.username).toEqual('tobyrushton1')
    })

    it('should return users email from username', async () => {
        mockCtx.prisma.users.findUnique.mockResolvedValue(userObject)

        const response = await ApolloMockServer.executeOperation({
            query: GetAuthFromUsername,
            variables: {
                username: userObject.username,
            },
        })

        expect(response.data?.getAuthFromUsername).toEqual({
            email: 'testEmail@kcl.ac.uk',
        })
    })

    it('should return user from email', async () => {
        mockCtx.prisma.users.findUnique.mockResolvedValue(userObject)

        const response = await ApolloMockServer.executeOperation({
            query: UserByEmailQuery,
            variables: {
                email: userObject.email,
            },
        })

        expect(response.data?.getUserFromAuth).toEqual({
            id: '1234817245dshfjsahdfa34',
            email: 'testEmail@kcl.ac.uk',
            firstName: 'Toby',
            lastName: 'Rushton',
            birthday: '12062005',
            course: 'Computer Science',
            university: 'UCL',
            username: 'tobyrushton',
            bio: '',
        })
    })

    it('should not return users email', async () => {
        mockCtx.prisma.users.findUnique.mockRejectedValue(
            '"Cannot return null for non-nullable field Query.getAuthFromUsername."'
        )

        const response = await ApolloMockServer.executeOperation({
            query: GetAuthFromUsername,
            variables: {
                username: 'tobyrushton',
            },
        })
        expect(
            (response.errors as unknown as GraphQLFormattedError[])[0].message
        ).toEqual(
            /* eslint-disable-next-line */
            'Unexpected error value: "\\"Cannot return null for non-nullable field Query.getAuthFromUsername.\\""'
        )
    })
})
