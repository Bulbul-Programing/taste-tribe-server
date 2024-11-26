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

const updateUserPremiumStatus = catchAsync(async (req: Request, res: Response) => {
    const transId = req.params.transId;
    const result = await userService.updateUserPremiumStatusIntoDB(transId) as any
    console.log(result);
    if (result.modifiedCount > 0) {
        res.redirect(`http://localhost:3000/payment/success`)
    }
    else {
        res.redirect(`http://localhost:3000/payment/fail`)
    }
})

export const userController = {
    createUser,
    updateUser,
    updateUserPremiumStatus
}