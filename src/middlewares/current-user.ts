import { NextFunction, Request, Response } from "express";
import _jwt from "jsonwebtoken";
import { AuthResponse } from "../auth";
import { getAuthToken } from "../utils/auth-token";
import env from "../config/environment";

declare global {
  namespace Express {
    interface Request {
      u?: AuthResponse;
    }
  }
}

export function currentUser(req: Request, _: Response, next: NextFunction) {
  const token = getAuthToken(req);

  try {
    const payload = _jwt.verify(token, env.JWT_KEY!) as AuthResponse;

    req.u = payload;
  } catch (error) {
    console.error(error);
  }

  next();
}
