import config from "../../config";
import AppError from "../../error/AppError";
import { createToken } from "../auth/auth.utils";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";

const createNewUserIntoDB = async (payload: TUser) => {
    const existingUser = await userModel.findOne({ email: payload.email })

    if (existingUser) {
        throw new AppError(401, 'User with this email already exist')
    }
    const createUser = await userModel.create(payload);
    const userData = await userModel.findById(createUser._id).select({ password: 0 }) as TUser

    const jwtPayload = {
        email: userData.email.toString(),
        role: userData.role,
        profilePicture: userData.profilePicture.toString(),
    };

    const accessToken = createToken(
        jwtPayload,
        config.accessTokenSecrete as string,
        config.accessTokenExpire as string,
    );
    const refreshToken = createToken(
        jwtPayload,
        config.refreshTokenSecrete as string,
        config.refreshTokenExpire as string,
    );

    return { accessToken, refreshToken }
}

export const userService = {
    createNewUserIntoDB
}