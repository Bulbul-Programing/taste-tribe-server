import { Types } from "mongoose";

export type TUser = {
    _id: String,
    name: String,
    email: String,
    password: String,
    role: 'admin' | 'user',
    profilePicture: String,
    followers: TFollowers[],
    following: TFollowers[],
    premiumStatus: Boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

export const userRoles = {
    user: 'user',
    admin: 'admin'
}

type TFollowers = {
    id?: Types.ObjectId,
}

export type TUserRole = keyof typeof userRoles;