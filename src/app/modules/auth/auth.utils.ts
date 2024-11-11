import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role?: 'admin' | 'user' ; profilePicture ?: string;},
  secret: string,
  expiresIn: string,
) => {
    const token = jwt.sign(jwtPayload, secret, {expiresIn})
    return token
};
