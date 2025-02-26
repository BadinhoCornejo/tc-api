import { Request } from 'express';

export function getAuthToken(req: Request): string {
  const token = req.session?.jwt;

  if (!token) {
    const authHeader = req.headers.authorization as string;

    if (!!authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7, authHeader.length);
    }
  }

  return token;
};
