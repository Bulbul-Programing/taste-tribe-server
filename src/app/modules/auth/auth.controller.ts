import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { loginService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await loginService.loginUser(req.body);
  res.status(200).json({
    success: true,
    massage: 'User logged in successfully',
    accessToken: result.accessToken,
    refreshToken : result.refreshToken
  });
});

const getUserData = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email
  const result = await loginService.getUserDataIntoDB(email);

  res.status(200).json({
    success: true,
    massage: 'User data retrieve successfully',
    data : result
  });
});

export const loginController = {
    loginUser,
    getUserData
}
