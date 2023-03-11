import { UserObjectWithID, UserObjectWithSettings } from './User'

export interface Friends {
    friendID: string
    usersId: string
    friendedAt: string // stored as iso date string
}

export interface FriendsWithID extends Friends {
    id: string
}

export type FriendID = {
    id: string
}

export type FriendReturnOne = {
    id: string
    Users_Friends_friendIDToUsers: UserObjectWithID | null
}

export type FriendReturnTwo = {
    id: string
    Users: UserObjectWithID | null
}

export type FriendReturnThree = {
    id: string
    Users_FriendRequests_friendIDToUsers: UserObjectWithID | null
}

export type FriendReturn = FriendReturnOne | FriendReturnTwo | FriendReturnThree

export type FriendRequestParams = {
    usersId: string
    friendId: string
}

export interface UserObjectWithSettingsAndFriends
    extends UserObjectWithSettings {
    friends: FriendsWithID[]
}
