import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import { userModel } from "./user.model";
import AppError from "../../error/AppError";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createNewUserIntoDB(req.body);
    res.status(200).json({
        success: true,
        massage: 'User create successfully',
        data: result
    })
})

const getAllUserCount = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUserCountIntoDB();
    res.status(200).json({
        success: true,
        massage: 'All user Count successfully',
        data: result
    })
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUserIntoDB();
    res.status(200).json({
        success: true,
        massage: 'All user retrieve successfully',
        data: result
    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.updateUserDataIntoDB(req.body);
    res.status(200).json({
        success: true,
        massage: 'User Update successfully',
        data: result
    })
})

const addFollower = catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const followerId = req.body.followerId;
    const payloadData = {
        userId,
        followerId
    }
    const result = await userService.addFollowerIntoDB(payloadData);
    res.status(200).json({
        success: true,
        massage: 'User Follow successfully',
        data: result
    })
})

const removeFollower = catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const followerId = req.body.followerId;
    const payloadData = {
        userId,
        followerId
    }
    const result = await userService.removeFollowerIntoDB(payloadData);
    res.status(200).json({
        success: true,
        massage: 'User unFollow successfully',
        data: result
    })
})

const getFollower = catchAsync(async (req: Request, res: Response) => {
    const userData = req.user
    if (!userData) {
        throw new AppError(404, 'You are not authorized!')
    }
    const isExistUser = await userModel.findById(userData.id)
    if (!isExistUser) {
        throw new AppError(404, 'User not found')
    }

    const result = await userService.getFollowerDataIntoDB(isExistUser.followers);
    res.status(200).json({
        success: true,
        massage: 'Follow user retrieve successfully',
        data: result
    })
})
const getFollowing = catchAsync(async (req: Request, res: Response) => {
    const userData = req.user
    if (!userData) {
        throw new AppError(404, 'You are not authorized!')
    }
    const isExistUser = await userModel.findById(userData.id)
    if (!isExistUser) {
        throw new AppError(404, 'User not found')
    }
    const result = await userService.getFollowingDataIntoDB(isExistUser.following);
    res.status(200).json({
        success: true,
        massage: 'Follow user retrieve successfully',
        data: result
    })
})

const updateUserPremiumStatusWithRedirect = catchAsync(async (req: Request, res: Response) => {
    const transId = req.params.transId;
    const redirectUrl = req.params.redirectUrl
    const result = await userService.updateUserPremiumStatusIntoDB(transId) as any
    if (result.modifiedCount > 0) {
        res.redirect(`http://localhost:3000/recipeDetails/${redirectUrl}`)
    }
    else {
        res.redirect(`http://localhost:3000/payment/fail`)
    }
})

const updateUserPremiumStatus = catchAsync(async (req: Request, res: Response) => {
    const transId = req.params.transId;
    const redirectUrl = req.params.redirectUrl
    const result = await userService.updateUserPremiumStatusIntoDB(transId) as any
    if (result.modifiedCount > 0) {
        res.redirect(`http://localhost:3000/payment/success`)
    }
    else {
        res.redirect(`http://localhost:3000/payment/fail`)
    }
})

const getTopFiveFollowers = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getTopFiveFollowersIntoDB()
    res.status(200).json({
        success: true,
        massage: 'Top five follower retrieve successfully!',
        data: result
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId
    const result = await userService.deleteUserIntoDB(userId)
    res.status(200).json({
        success: true,
        massage: 'user Delete successfully ',
        data: result
    })
})
const blockedUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.userId
    const blockStatus = req.body.blockStatus
    const result = await userService.blockUserIntoDB({ id: userId, blockStatus })
    res.status(200).json({
        success: true,
        massage: 'user Blocked status update successfully ',
        data: result
    })
})


export const userController = {
    createUser,
    getAllUser,
    getAllUserCount,
    addFollower,
    updateUser,
    updateUserPremiumStatusWithRedirect,
    updateUserPremiumStatus,
    removeFollower,
    getFollower,
    getFollowing,
    getTopFiveFollowers,
    deleteUser,
    blockedUser
}