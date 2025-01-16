import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || '';
const ref_secret = process.env.REFRESH_TOKEN_SECRET || '';

interface ICustomJwtPayload extends JwtPayload {
  userId: string;
}

export interface ISignPayload {
  userId: string;
}

export const generateAccessToken = (userId: string) => {
  const payload: ISignPayload = {
    userId,
  };
  return jwt.sign(payload, secret, {
    expiresIn: process.env.TOKEN_EXPIRATION || '',
  });
};

export const generateRefreshToken = (userId: string) => {
  const payload: ISignPayload = {
    userId,
  };
  return jwt.sign(payload, ref_secret, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '',
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, secret) as ICustomJwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, ref_secret) as ICustomJwtPayload;
};
