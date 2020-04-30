import { Request, Response, NextFunction } from 'express';
import jwtS from '../services/jwtService';

const verifyBearerToken = async (req: Request, res: Response, next: NextFunction) => {
  const { headers } = req;
  if (!headers?.authorization) return res.status(401).json(false);
  const { authorization } = headers;
  const token = authorization.slice(authorization.indexOf(' ') + 1);
  const decryptedToken = await jwtS.verifyToken(token);
  if (decryptedToken) {
    res.locals.userId = decryptedToken;
  }
  return next();
};

const verifyCookieToken = async (req: Request, res: Response, next: NextFunction) => {
  const { cookies } = req;
  if (!cookies) return res.status(401).json(false);
  console.log(cookies);
};

export default {
  verifyBearerToken,
  verifyCookieToken,
};
