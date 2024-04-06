import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../models/error.models';

interface DecodedToken {
  user: {
    _id: string,
    email: string,
    password: string,
    type: string;
  };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  private SECRET_KEY: string = 'secret';

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the authorization header

      if (!token) throw new UnauthorizedError('Auth token is missing');

      const decoded = jwt.verify(token, this.SECRET_KEY) as DecodedToken; // verify the JWT token      
      console.log(req.body);
      
      req['user'] = decoded; // we add an extra header called user so we can extract the data
      
      next(); // Call the next middleware or route handler
    } catch (err) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }
};
