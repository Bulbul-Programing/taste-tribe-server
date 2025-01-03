import { userInfo } from "os";
import config from "../../config";
import AppError from "../../error/AppError";
import { isPasswordMatched } from "../../utils/isPasswordMatch";
import { createToken } from "../auth/auth.utils";
import { TUpdateUserData, TUpdateUserInfo, TUser } from "./user.interface";
import { userModel } from "./user.model";
import { isUserExist } from "../../utils/isUserExist";
import bcrypt from "bcrypt";

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
        id: userData._id,
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

const getAllUserCountIntoDB = async () => {
    const result = await userModel.countDocuments()
    return result
}

const getAllUserIntoDB = async () => {
    const result = await userModel.find()
    return result
}

const addFollowerIntoDB = async (payload: { userId: string, followerId: string }) => {
    const isExistUser = await userModel.findById(payload.userId)
    if (!isExistUser) {
        throw new AppError(401, 'User not found')
    }

    const isExistFollower = await userModel.findById(payload.followerId)
    if (!isExistFollower) {
        throw new AppError(401, 'Follower user not found')
    }

    if (isExistFollower && isExistFollower!.followers.length < 1) {
        const result = await userModel.updateOne({ _id: payload.followerId }, { $push: { followers: payload.userId } })
        await userModel.updateOne({ _id: payload.userId }, { $push: { following: payload.followerId } })
        return result
    }

    const isAlreadyFollower = isExistFollower.followers.some((follower) => follower.toString() === payload.userId)
    if (isAlreadyFollower) {
        throw new AppError(403, 'You are already following this user')
    }

    const result = await userModel.updateOne({ _id: payload.followerId }, { $push: { followers: payload.userId } })
    await userModel.updateOne({ _id: payload.userId }, { $push: { following: payload.followerId } })
    return result

}

const removeFollowerIntoDB = async (payload: { userId: string, followerId: string }) => {
    const isExistUser = await userModel.findById(payload.userId)
    if (!isExistUser) {
        throw new AppError(401, 'User not found')
    }

    const isExistFollower = await userModel.findById(payload.followerId)
    if (!isExistFollower) {
        throw new AppError(401, 'Follower user not found')
    }

    if (!isExistFollower.followers.includes(payload.userId)) {
        throw new AppError(403, 'You are not following this user')
    }

    const result = await userModel.updateOne({ _id: payload.followerId }, { $pull: { followers: payload.userId } })

    await userModel.updateOne({ _id: payload.userId }, { $pull: { following: payload.followerId } })
    return result


}

const getFollowerDataIntoDB = async (followIds: string[]) => {
    const result = await userModel.find({ _id: { $in: followIds } })
    return result
}

const getFollowingDataIntoDB = async (followingIds: string[]) => {
    const result = await userModel.find({ _id: { $in: followingIds } })
    return result
}

const updateUserDataIntoDB = async (payload: TUpdateUserData) => {
    const isExistUser = await isUserExist(payload.email)
    if (!isExistUser) {
        throw new AppError(401, 'User not found')
    }

    let updateInfo: TUpdateUserInfo = {}
    if (payload.currentPassword && payload.newPassword) {
        const isPasswordMatch = await isPasswordMatched(payload.currentPassword, isExistUser.password.toString())

        if (!isPasswordMatch) {
            throw new AppError(403, 'Your current password is not a valid')
        }
        updateInfo.password = await bcrypt.hash((payload.newPassword as string), 10)
    }
    if (payload.name) {
        updateInfo.name = payload.name
    }
    if (payload.name) {
        updateInfo.name = payload.name
    }
    if (payload.profilePicture) {
        updateInfo.profilePicture = payload.profilePicture
    }
    const result = await userModel.updateOne({ email: payload.email }, updateInfo, { new: true })
    return result
}

const updateUserPremiumStatusIntoDB = async (transId: string) => {
    const isExistTransId = await userModel.findOne({ transitionId: transId })
    if (!isExistTransId) {
        throw new AppError(401, 'Invalid transition id provided!')
    }
    const result = await userModel.updateOne({ transitionId: transId }, { premiumStatus: true })
    return result
}

const getTopFiveFollowersIntoDB = async () => {
    const result = await userModel.aggregate([
        {
            $sort: { followers: -1 }
        }
    ]).limit(5)
    return result
}

export const userService = {
    createNewUserIntoDB,
    getAllUserCountIntoDB,
    getAllUserIntoDB,
    updateUserDataIntoDB,
    addFollowerIntoDB,
    updateUserPremiumStatusIntoDB,
    removeFollowerIntoDB,
    getFollowerDataIntoDB,
    getFollowingDataIntoDB,
    getTopFiveFollowersIntoDB
}