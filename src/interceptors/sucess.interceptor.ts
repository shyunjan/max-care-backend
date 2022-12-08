import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBodyType } from 'src/types';
import { RESULT_CODE } from '../constant';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        (data: any): ResponseBodyType => ({
          code: RESULT_CODE.OK,
          statusCode: 200,
          data,
          timestamp: new Date().toISOString(),
        })
      )
    );
  }
}
