import { Request, Response, NextFunction } from 'express';
import ApiError from '../exertions/api-error';
import { tokenService } from '../service/token-service';

export function authMiddlewareCookie(req:Request, res:Response, next:NextFunction) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return next(ApiError.UnauthorizedError());
  }

  const userData = tokenService.validateAccessToken(accessToken);
  if (accessToken && userData) {
    req.user = userData;
    return next();
  }
  return next(ApiError.UnauthorizedError());
}
