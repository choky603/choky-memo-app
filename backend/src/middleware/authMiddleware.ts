import type { Request, Response, NextFunction } from 'express';

import { verifyAccessToken } from '../utils/tokenUtils';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = verifyAccessToken(token);
    // req.user = decoded;
    console.log(`verify user:${decoded.userId}`);
    next();
  } catch (err) {
    console.log(`${err}`);
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
};
