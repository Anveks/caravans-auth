import { HttpException, HttpStatus } from '@nestjs/common';

// Base client error:
export abstract class ClientError extends HttpException {
  constructor(status: number, message: string) {
    super({ status, message }, status);
  }
}

// General error:
export class ServerError extends ClientError {
  constructor(status: number = 500, message: string = 'Something went wrong. Try again later.') {
    super(status, message);
  }
}

// Route not found error:
export class RouteNotFoundError extends ClientError {
  constructor(route: string) {
    super(HttpStatus.NOT_FOUND, `Route ${route} not found`);
  }
}

// Resource not found error:
export class ResourceNotFoundError extends ClientError {
  constructor(email: string, message?: string) {
    super(
      HttpStatus.NOT_FOUND,
      message || `User with email ${email} not found.`
    );
  }
}

// Validation error:
export class ValidationError extends ClientError {
  constructor(customTarget: any, message?: string) {
    super(HttpStatus.BAD_REQUEST, message || `${customTarget} is already in use.`);
  }
}

// Authentication error:
export class UnauthorizedError extends ClientError {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
