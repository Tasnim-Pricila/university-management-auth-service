import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import { verifyToken } from '../helper/jwtHelpers';
import config from '../config';
import { Secret } from 'jsonwebtoken';

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      let verifiedUser = null;

      verifiedUser = verifyToken(token, config.jwt.secret as Secret);
      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized role');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
