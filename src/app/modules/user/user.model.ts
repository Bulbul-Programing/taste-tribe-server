import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";
import { NextFunction } from "express";

const userSchema = new Schema<TUser>({
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true, select: 0 },
    role: { type: "string", enum: ['admin', 'user'], default: 'user' },
    profilePicture: { type: "string", default: null },
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