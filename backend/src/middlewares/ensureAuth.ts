import { Request, Response, NextFunction } from 'express';
import auth from '../config/auth';
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
    throw new Error('JWT token is missing');
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
    throw new Error(`${err}`);
  }
}