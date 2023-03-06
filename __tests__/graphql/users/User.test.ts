import { ApolloServer } from '@apollo/server'
import { GraphQLFormattedError } from 'graphql'
import { MockContext, createMockContext } from '../../__helpers__/context'
import { schema } from '../../../graphql/schema'
import { UserObjectWithSettings, UserObjectWithID } from '../../../types'
import {
    CREATE_USER,
    UPDATE_USER,
    GET_USER_BY_EMAIL,
    GET_USER_BY_ID,
    GET_AUTH_FROM_USERNAME,
} from '../../../graphql/queries'
import { Response } from '../../__helpers__/types'

describe('user query tests', () => {
    let mockCtx: MockContext
    let ApolloMockServer: ApolloServer

    beforeEach(() => {
        mockCtx = createMockContext()
        ApolloMockServer = new ApolloServer({
            schema,
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

    const userObject: UserObjectWithSettings = {
        id: '1234817245dshfjsahdfa34',
        email: 'testEmail@kcl.ac.uk',
        firstName: 'Toby',
        lastName: 'Rushton',
        birthday: '12062005',
        course: 'Computer Science',
        university: 'UCL',
        username: 'tobyrushton',
        bio: '',
        settings: { darkMode: false, universityPreference: 'OWN' },
    }

    it('should fail with missing variable', async () => {
        const response = await ApolloMockServer.executeOperation(
            {
                query: GET_USER_BY_ID,
                variables: {
                    firstName: true,
                    lastName: true,
                },
            },
            {
                contextValue: mockCtx,
            }
        )

        expect(
            (
                (response as unknown as Response).body.singleResult
                    .errors as GraphQLFormattedError[]
            )[0].message
        ).toBe(`Variable "$id" of required type "String!" was not provided.`)
    })

    it('should fail with invalid email on create user', async () => {
        const response = await ApolloMockServer.executeOperation({
            query: CREATE_USER,
            variables: failedUser,
        })

        expect(
            (
                (response as unknown as Response).body.singleResult
                    .errors as GraphQLFormattedError[]
            )[0].message
        ).toEqual('Email is not valid. Please enter a valid university email')
    })

    it('should fail with invalid username on update user', async () => {
        const response = await ApolloMockServer.executeOperation(
            {
                query: UPDATE_USER,
                variables: {
                    id: failedUser.id,
                    username: 't%df',
                },
            },
            {
                contextValue: mockCtx,
            }
        )

        expect(
            (
                (response as unknown as Response).body.singleResult
                    .errors as GraphQLFormattedError[]
            )[0].message
        ).toEqual(
            'Username is not valid. Please ensure it contains no special characters'
        )
    })

    it('should create new user', async () => {
        mockCtx.prisma.users.create.mockResolvedValue(userObject)

        const response = await ApolloMockServer.executeOperation(
            {
                query: CREATE_USER,
                variables: userObject,
            },
            {
                contextValue: mockCtx,
            }
        )

        expect(
            (response as unknown as Response<{ createUser: UserObjectWithID }>)
                .body.singleResult.data?.createUser
        ).toEqual({
            email: 'testEmail@kcl.ac.uk',
            firstName: 'Toby',
            lastName: 'Rushton',
            birthday: '12062005',
            course: 'Computer Science',
            university: 'UCL',
            username: 'tobyrushton',
            bio: '',
            settings: {
                darkMode: false,
                universityPreference: 'OWN',
                usersId: null,
            },
        })
    })

    it('should fail to create new user', async () => {
        const failUser = {
            firstName: 'Toby',
            lastName: 'Rushton',
            birthday: '12062005',
            university: 'KCL',
        }

        const response = await ApolloMockServer.executeOperation(
            {
                query: CREATE_USER,
                variables: failUser,
            },
            {
                contextValue: mockCtx,
            }
        )

        expect(
            Boolean((response as unknown as Response).body.singleResult.errors)
        ).toBe(true)
    })

    it('should update users username', async () => {
        const user = { ...userObject }
        user.username = 'tobyrushton1'
        mockCtx.prisma.users.update.mockResolvedValue(user)

        const response = await ApolloMockServer.executeOperation(
            {
                query: UPDATE_USER,
                variables: {
                    id: user.id,
                    username: user.username,
                },
            },
            {
                contextValue: mockCtx,
            }
        )

        expect(
            (response as unknown as Response<{ updateUser: UserObjectWithID }>)
                .body.singleResult.data?.updateUser.username
        ).toEqual('tobyrushton1')
    })

    it('should return users email from username', async () => {
        mockCtx.prisma.users.findUnique.mockResolvedValue(userObject)

        const response = await ApolloMockServer.executeOperation(
            {
                query: GET_AUTH_FROM_USERNAME,
                variables: {
                    username: userObject.username,
                },
            },
            {
                contextValue: mockCtx,
            }
        )

        expect(
            (
                response as unknown as Response<{
                    getAuthFromUsername: UserObjectWithID
                }>
            ).body.singleResult.data?.getAuthFromUsername
        ).toEqual({
            email: 'testEmail@kcl.ac.uk',
        })
    })

    it('should return user from email', async () => {
        const temp = { ...userObject, friends: [] }
        mockCtx.prisma.users.findUnique.mockResolvedValue(temp)

        const response = await ApolloMockServer.executeOperation(
            {
                query: GET_USER_BY_EMAIL,
                variables: {
                    email: userObject.email,
                },
            },
            {
                contextValue: mockCtx,
            }
        )

        expect(
            (
                response as unknown as Response<{
                    getUserFromAuth: UserObjectWithID
                }>
            ).body.singleResult.data?.getUserFromAuth
        ).toEqual({
            id: '1234817245dshfjsahdfa34',
            email: 'testEmail@kcl.ac.uk',
            firstName: 'Toby',
            lastName: 'Rushton',
            birthday: '12062005',
            course: 'Computer Science',
            university: 'UCL',
            username: 'tobyrushton',
            bio: '',
            settings: {
                darkMode: false,
                universityPreference: 'OWN',
            },
            friends: [],
        })
    })

    it('should not return users email', async () => {
        mockCtx.prisma.users.findUnique.mockRejectedValue(
            '"Cannot return null for non-nullable field Query.GET_AUTH_FROM_USERNAME."'
        )

        const response = await ApolloMockServer.executeOperation(
            {
                query: GET_AUTH_FROM_USERNAME,
                variables: {
                    username: 'tobyrushton',
                },
            },
            {
                contextValue: mockCtx,
            }
        )

        expect(
            (
                (response as unknown as Response).body.singleResult
                    .errors as GraphQLFormattedError[]
            )[0].message
        ).toEqual(
            /* eslint-disable-next-line */
            'Unexpected error value: "\\"Cannot return null for non-nullable field Query.GET_AUTH_FROM_USERNAME.\\""'
        )
    })
})
