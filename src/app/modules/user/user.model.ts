import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";
import { NextFunction } from "express";
const follower = new Schema({
    id: { type: String , ref : 'user'}
})
const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    followers: { type: [follower], required: true },
    following: { type: [follower], required: true },
    profilePicture: { type: String, default: null },
    premiumStatus: { type: "boolean", default: false },
})

userSchema.pre('save', async function (next) {
    const userData = this
    const hashedPassword = await bcrypt.hash((userData.password as string), 10)
    this.password = hashedPassword
    next()
})

userSchema.post('save', async function (doc, next) {
    doc.password = ''
    next()
})

export const userModel = model<TUser>('user', userSchema)