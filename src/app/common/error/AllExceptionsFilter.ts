import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RESULT_CODE } from '../../../constant';
import CustomError from './CustomError';

export default class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let code: number,
      statusCode: number,
      message: string,
      data: any = {},
      logging: boolean = false;
    if (exception instanceof CustomError) {
      code = exception.code;
      statusCode = exception.status;
      message = exception.message;
      data = exception.data;
      logging = exception.logging;
    } else if (exception instanceof HttpException) {
      code = RESULT_CODE.UNKNOWN_ERROR;
      statusCode = exception.getStatus();
      message = exception.message;
    } else {
      code = RESULT_CODE.UNKNOWN_ERROR;
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception instanceof Error ? exception.message : '';
    }

    const responseBody = {
      code,
      statusCode,
      timestamp: new Date().toISOString(),
      message,
      data,
      logging,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
