import type { Request, Response } from 'express';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/tokenUtils';
import { gfQuerySelect } from '../database/queryUtil';

interface IUser {
  userId: string;
  userName: string;
  memo: string;
}

export const login = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  // console.log(`@ username:${username}| pw:${password}`);
  let userRows: IUser[] = [];
  let user: IUser = {
    userId: '',
    userName: '',
    memo: '',
  };

  const sql = `
    select user_id    as userId
         , user_name  as userName
         , memo       as memo
      from tb_user_m
     where user_id = '${userId}'
       and user_pw = '${password}'`;
  userRows = (await gfQuerySelect(sql, userRows)) as IUser[];
  // console.log(`${JSON.stringify(userRows)}`);

  // 사용자정보가 있으면
  if (userRows.length > 0) {
    user = userRows[0];
  }

  if (!user.userId) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const accessToken = generateAccessToken(user.userId);
  const refreshToken = generateRefreshToken(user.userId);

  res.json({ accessToken, refreshToken });
};

export const refresh = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken(decoded.userId);
    res.json({ accessToken });
  } catch (err) {
    console.log(`${err}`);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};
