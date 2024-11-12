import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { resetPasswordService } from "./resetPassword.service"


const resetPasswordMailSend = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await resetPasswordService.resetPasswordMailSendIntoDB(payload)

    res.status(200).json({
        success: true,
        massage: 'Reset Password email send successful',
        data: result
    })
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await resetPasswordService.resetPassword(payload)

    res.status(200).json({
        success: true,
        massage: 'password change successful',
        data: result
    })
})

export const resetPasswordController = {
     resetPasswordMailSend,
     resetPassword
}