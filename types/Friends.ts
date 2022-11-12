export interface Friends {
    friendID: string
    userId: string
    friendedAt: any[] // temporary data type
}

export interface FriendsWithID extends Friends {
    id: number
}

export type FriendID = {
    id: number
}
