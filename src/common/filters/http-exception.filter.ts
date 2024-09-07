import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : exceptionResponse),
    });
  }
}

// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
//   Logger,
// } from '@nestjs/common';
// import { Response } from 'express';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   constructor(private readonly logger: Logger) {}

//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const request = ctx.getRequest<Request>();
//     const response = ctx.getResponse<Response>();
//     const status = exception.getStatus();
//     const exceptionResponse = exception.getResponse();

//     const errorResponse = {
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message: this.getMessage(exceptionResponse),
//     };

//     // Log the error using custom logger
//     this.logger.error(
//       `HTTP ${status} ${request.method} ${request.url} - ${exception.message}`,
//       exception.stack,
//     );

//     response.status(status).json(errorResponse);
//   }

//   private getMessage(exceptionResponse: any): string {
//     if (typeof exceptionResponse === 'string') {
//       return exceptionResponse;
//     } else if (exceptionResponse.message) {
//       return Array.isArray(exceptionResponse.message)
//         ? exceptionResponse.message.join(', ')
//         : exceptionResponse.message;
//     }
//     return 'An unexpected error occurred';
//   }
// }
