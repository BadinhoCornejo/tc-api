import { NotAuthorizedError } from '@softcodestudio/common';
import { NextFunction, Request, Response } from 'express';
import { getAuthToken } from '../utils/auth-token';

export const requireAuth = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.u) {
    throw new NotAuthorizedError();
  }

  const token = getAuthToken(req);
  
  if (!token) throw new NotAuthorizedError();

  // const t = await tokenRepository.exists(token);

  // if (!t) throw new NotAuthorizedError();

  // if (t.revoked || t.expired || t.type === 1) throw new NotAuthorizedError();

  next();
};
