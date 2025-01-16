import type { Request, Response } from 'express';

// Mock database
const users = [
  {
    username: 'choky@gmail.com',
    password: '1234',
    id: 1,
    name: '고래상어2',
  },
];

export const getUserProfile = (req: Request, res: Response) => {
  //console.log(`users[0].name:${users[0].name}`)
  res.json({ id: users[0].id, username: users[0].name, role: 'User' });
};
