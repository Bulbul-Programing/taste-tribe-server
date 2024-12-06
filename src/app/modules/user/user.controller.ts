import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createNewUserIntoDB(req.body);
    res.status(200).json({
        success: true,
        massage: 'User create successfully',
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

const getFollowerAndFollowing = catchAsync(async (req: Request, res: Response) => {
    const followIds = req.body
    const result = await userService.getFollowerAndFollowingDataIntoDB(followIds);
    res.status(200).json({
        success: true,
        massage: 'Follow user retrieve successfully',
        data: result
    })
})

const updateUserPremiumStatus = catchAsync(async (req: Request, res: Response) => {
    const transId = req.params.transId;
    const result = await userService.updateUserPremiumStatusIntoDB(transId) as any
    if (result.modifiedCount > 0) {
        res.redirect(`http://localhost:3000/payment/success`)
    }
    else {
        res.redirect(`http://localhost:3000/payment/fail`)
    }
})

export const userController = {
    createUser,
    addFollower,
    updateUser,
    updateUserPremiumStatus,
    removeFollower,
    getFollowerAndFollowing
}