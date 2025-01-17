import type { Request, Response } from 'express';
import { gfSelectUser } from '../database/queryUtil';

interface IUser {
  userId: string;
  userName: string;
  memo: string;
}

export const getUserProfile = async (req: Request, res: Response) => {
  const { userId } = req.query;
  // console.log(`@userId:${userId}`);

  let userRows: IUser[] = [];
  let user: IUser = {
    userId: '',
    userName: '',
    memo: '',
  };

  if (typeof userId === 'string') {
    userRows = (await gfSelectUser({ userId }, userRows)) as IUser[];
  }
  //console.log(`${JSON.stringify(userRows)}`);

  // 사용자정보가 있으면
  if (userRows.length > 0) {
    user = userRows[0];
  }

  res.json({
    id: user.userId,
    username: user.userName,
    role: 'User',
  });
};
