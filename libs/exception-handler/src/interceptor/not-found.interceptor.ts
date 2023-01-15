import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { isNil, isEmpty } from 'lodash';
@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(tap(data => {
        if (isNil(data) || isEmpty(data)) throw new NotFoundException();
      }));
  }
}