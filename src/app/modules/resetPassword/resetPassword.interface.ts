import { Document } from "mongoose";

export interface TResetPassword extends Document {
    email : string;
    token : string;
    createdAt: Date;
}

export type TValidateCode  = {
    email : string;
    code : string;
}