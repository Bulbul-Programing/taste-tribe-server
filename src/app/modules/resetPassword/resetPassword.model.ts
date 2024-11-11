import { model, Schema } from "mongoose";
import { TResetPassword } from "./resetPassword.interface";

const resetPasswordSchema = new Schema<TResetPassword>({
    email: { type: String, required: true, },
    tempPassword: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60
    }
})

export const resetPasswordModel = model<TResetPassword>('resetPassword', resetPasswordSchema)