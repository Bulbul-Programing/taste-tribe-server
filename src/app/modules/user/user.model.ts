import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser>({
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true, select: 0 },
    role: { type: "string", enum: ['admin', 'user'], default: 'user' },
    profile_picture: { type: "string", default: null },
    PremiumStatus: { type: "boolean", default: false },
})

userSchema.pre('save', async function (next) {
    const userData = this
    console.log(userData);
    // userData.password = await bcrypt.hash(userData.password, Number(config.bcrypt_round))
    next()
})

export const userModel = model<TUser>('user', userSchema)