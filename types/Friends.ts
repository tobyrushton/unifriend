import { UserObjectWithID } from './User'

export interface Friends {
    friendID: string
    userId: string
    friendedAt: any[] // temporary data type
}

export interface FriendsWithID extends Friends {
    id: string
}

export type FriendID = {
    id: string
}

export type FriendReturnOne = {
    Users_Friends_friendIDToUsers: UserObjectWithID
}

export type FriendReturnTwo = { Users: UserObjectWithID | null }

export type FriendReturn = FriendReturnOne | FriendReturnTwo

export type FriendRequestParams = {
    usersId: string
    friendId: string
}
