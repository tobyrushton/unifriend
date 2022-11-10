import { MockContext, Context, createMockContext } from './__helpers__/context'
import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { UserObjectWithID } from '../types'

let mockCtx: MockContext
let ctx: Context
let ApolloMockServer: ApolloServer

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
  ApolloMockServer = new ApolloServer({
    schema,
    context: ctx,
    resolvers
  })
})

it('should fail with missing variable', async () => {
    const response = await ApolloMockServer.executeOperation({
        query: `query Query($usersId: String!, $firstName: Boolean, $lastName: Boolean) {
            users(id: $usersId, firstName: $firstName, lastName: $lastName) {
              bio
            }
          }`,
          variables: {
            firstName: true,
            lastName: true
          }
    })

    expect(response.errors?.toString()).toBe(`Variable "$usersId" of required type "String!" was not provided.`)
})

it('should create new user', async () => {
    const user:UserObjectWithID = {
        id: '1234817245dshfjsahdfa34',
        email: 'testEmail@email.com',
        firstName: 'Toby',
        lastName: 'Rushton',
        birthday: '12062005',
        course: 'Computer Science',
        university: 'UCL',
        username: 'tobyrushton',
        bio: ''
    }

    mockCtx.prisma.users.create.mockResolvedValue(user)

    const response  = await ApolloMockServer.executeOperation({
        query: 
            `mutation Mutation($firstName: String!, $lastName: String!, $birthday: String!, $university: String!, $course: String!, $username: String!, $email: String!) {
                createUser(firstName: $firstName, lastName: $lastName, birthday: $birthday, university: $university, course: $course, username: $username, email: $email) {
                    id
                    bio
                    birthday
                    course
                    email
                    firstName
                    lastName
                    university
                    username
                }
            }`,
          variables: user
    })
    expect(response.data?.createUser).toEqual(user)
})

it('should update users username', async ()=> {
    let user:UserObjectWithID = {
        id: '1234817245dshfjsahdfa34',
        email: 'testEmail@email.com',
        firstName: 'Toby',
        lastName: 'Rushton',
        birthday: '12062005',
        course: 'Computer Science',
        university: 'UCL',
        username: 'tobyrushton',
        bio: ''
    }

    mockCtx.prisma.users.create.mockResolvedValue(user)

    await ApolloMockServer.executeOperation({
        query: 
            `mutation Mutation($firstName: String!, $lastName: String!, $birthday: String!, $university: String!, $course: String!, $username: String!, $email: String!) {
                createUser(firstName: $firstName, lastName: $lastName, birthday: $birthday, university: $university, course: $course, username: $username, email: $email) {
                    id
                    bio
                    birthday
                    course
                    email
                    firstName
                    lastName
                    university
                    username
                }
            }`,
          variables: user
    })

    user.username = 'tobyrushton1'
    mockCtx.prisma.users.update.mockResolvedValue(user)

    const response = await ApolloMockServer.executeOperation({
        query: `mutation UpdateUser($id: String!, $username: String) {
            updateUser(id: $id, username: $username) {
              username
            }
          }`,
          variables: {
            id: user.id,
            username: user.username
          }
    })

    expect(response.data?.updateUser).toEqual({username:'tobyrushton1'})
})
