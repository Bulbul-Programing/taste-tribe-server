import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentGatewayService } from "./paymentGateway.service";
import { userModel } from "../user/user.model";

const paymentProcess = catchAsync(async (req: Request, res: Response) => {
  const updateInfo = req.body
  const user = req.user

  if (updateInfo.payableAmount < 1) {
    const updateInfo = {
      premiumStatus: false,
    }
    const updateUser = await userModel.updateOne({ email: user.email }, updateInfo, { new: true });
    return res.status(200).json({
      userStatus: false,
      data: 'user status updated to Basic user!'
    });
  }

  const userData = {
    email: user.email,
    payableAmount: updateInfo.payableAmount,
    redirectUrl: updateInfo.redirectUrl
  }
  const result = await paymentGatewayService.paymentProcessIntoDB(userData);

  res.status(200).json({
    url: result,
  });
});

const redirect = catchAsync(async (req: Request, res: Response) => {
  const params = req.params.path
  res.redirect(`http://localhost:3000/payment/${params}`)
});

export const paymentGatewayController = {
  paymentProcess,
  redirect
};

