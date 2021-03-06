import { Request, Response, NextFunction } from 'express';
import auth from '../config/auth';
import AppError from '../errors/AppError';
import { verify } from 'jsonwebtoken';

interface TokePayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);
    const { sub } = decoded as TokePayload;

    request.user = {
      id: sub
    }

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}