import config from '../../config';
import AppError from '../../error/AppError';
import { isPasswordMatched } from '../../utils/isPasswordMatch';
import { isUserExist } from '../../utils/isUserExist';
import { userModel } from '../user/user.model';
import { TLogin } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLogin) => {
  const isExistUser = await isUserExist(payload.email);

  if (!isExistUser) {
    throw new AppError(403, 'user not found');
  }

  const isPasswordMatch = await isPasswordMatched(
    payload.password,
    (isExistUser.password as string),
  );
  if (!isPasswordMatch) {
    throw new AppError(403, 'Password do not matched');
  }

  const jwtPayload = {
    email: isExistUser.email.toString(),
    role: isExistUser.role,
    id : isExistUser._id,
    profilePicture: isExistUser.profilePicture.toString(),
    premiumStatus : isExistUser.premiumStatus
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
};

const getUserDataIntoDB = async (email: string) => {
  const getUser = await userModel.findOne({ email }).select({ password: 0 })
  if (!getUser) {
    throw new AppError(404, 'User not found')
  }
  return getUser
}

export const loginService = {
  loginUser,
  getUserDataIntoDB
};
