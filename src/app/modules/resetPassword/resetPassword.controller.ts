import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { resetPasswordService } from "./resetPassword.service"


const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await resetPasswordService.resetPasswordIntoDB(payload)

    res.status(200).json({
        success: true,
        massage: 'Reset Password email send successful',
        data: result
    })
})
const validateCode = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await resetPasswordService.validateCodeIntoDB(payload)

    res.status(200).json({
        success: true,
        massage: 'code validate successfully ',
        data: result
    })
})

export const resetPasswordController = {
    resetPassword,
    validateCode
}