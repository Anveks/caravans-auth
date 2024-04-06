import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ClientError } from "../models/error.models";

interface HttpExceptionResponse {
  statusCode: number,
  message: string,
}

interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  // has the statusCode and error inherited from the HttpErrorResponse
  path: string;
  method: string;
  timeStamp: Date;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof ClientError) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      errorMessage = (errorResponse as HttpExceptionResponse).message || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occured!';
    };

    const errorResponse: CustomHttpExceptionResponse = this.getErrorResponse(status, errorMessage, request);
    this.logError(errorResponse, request, exception);

    response.status(status).json(errorResponse);
  }

  // constructing the error response in a private method: 
  private getErrorResponse = (status: HttpStatus, errorMessage : string, request: Request): CustomHttpExceptionResponse => ({ 
    statusCode: status,
    message: errorMessage,
    path: request.path,
    method: request.method,
    timeStamp: new Date(), // probably not really needed here, but let it be till the logger is written...
   });

   // loggin the error in the console (for now); TODO: log to a file later
   private logError = (errorResponse: CustomHttpExceptionResponse, request: Request, exception: unknown): void => {
    const { statusCode, message } = errorResponse; // extracting the needed variables 
    const { method, url } = request;
    const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url} \n\n
    ${exception instanceof ClientError ? exception.stack : message} \n\n
    `; // TODO: add user to the request later
    console.log(errorLog);
   }

   private errorLogger(){
    // TODO: write the logger 
   }
}