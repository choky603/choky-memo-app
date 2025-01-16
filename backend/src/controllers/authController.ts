import type { Request, Response } from 'express';
import pool from '../database/connect/mariadb';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/tokenUtils';

interface IUser {
  userId: string;
  userName: string;
  memo: string;
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // console.log(`@ username:${username}| pw:${password}`);
  let userRow: IUser = {
    userId: '',
    userName: '',
    memo: '',
  };
  let connection;
  try {
    connection = await pool.getConnection();

    const sql = `
    select user_id    as userId
         , user_name  as userName
         , memo       as memo
      from tb_user_m
     where user_id = '${username}'
       and user_pw = '${password}'`;
    const rows: IUser[] = await connection.query(sql);
    // console.log(rows);
    if (rows.length > 0) {
      userRow = rows[0];
    }
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    if (connection) {
      connection.release(); // 연결 반환
    }
  }

  if (!userRow.userId) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const accessToken = generateAccessToken(userRow.userName);
  const refreshToken = generateRefreshToken(userRow.userName);

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
