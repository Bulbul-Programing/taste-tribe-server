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

export const userController = {
    createUser
}