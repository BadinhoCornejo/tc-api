import { NotAuthorizedError } from "@softcodestudio/common"
import { NextFunction, Request, Response } from 'express';

export const requireFeature = (routeFeatures: string) => (req: Request, _: Response, next: NextFunction) => {
  if (!req.u) throw new NotAuthorizedError();

  const { features: userFeatures } = req.u;

  if (!userFeatures.length) throw new NotAuthorizedError();

  let isAuthorized = false;

  if (userFeatures === "ADMIN") isAuthorized = true;
  else isAuthorized = userFeatures.split(",").some(f => routeFeatures.includes(f));
  
  if (isAuthorized) next();
  else throw new NotAuthorizedError();
}
