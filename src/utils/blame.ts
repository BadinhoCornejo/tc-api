import { Request } from 'express';

export function blame(req: Request): string {
  if(!req.u) return "unknown";

  return req.u.sub;
};
