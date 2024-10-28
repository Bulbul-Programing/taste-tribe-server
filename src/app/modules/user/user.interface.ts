export type TUser = {
    id: String,
    name: String,
    email: String,
    password: String,
    role: 'admin' | 'user',
    profile_picture: String,
    PremiumStatus: Boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

const userRoles = {
    user: 'user',
    admin: 'admin'
}

export type TUserRole = keyof typeof userRoles;