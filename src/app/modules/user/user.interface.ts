export type TUser = {
    id: String,
    name: String,
    email: String,
    password: String,
    role: 'admin' | 'user',
    profilePicture: String,
    premiumStatus: Boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

export const userRoles = {
    user: 'user',
    admin: 'admin'
}

export type TUserRole = keyof typeof userRoles;