import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: 'Token is missing',
    });
  }

  const [, token]= authToken.split(" ");

  try {
    verify(token, '5414a200-c5ed-4788-91a8-b412dc148c8b');

    return next();
  } catch(err) {
    return response.status(401).json({
      message: 'Token invalid',
    });
  }
}