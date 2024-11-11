import { Document } from "mongoose";

export interface TResetPassword extends Document {
    email : string;
    tempPassword ?: string;
    createdAt: Date;
}

export type TValidateCode  = {
    email : string;
    code : string;
}