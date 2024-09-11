import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    return next.handle().pipe(
      map((data) => ({
        statusCode:statusCode,
        data
      })),
      catchError(err =>{
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;
        return throwError(() => new HttpException({}, statusCode));
        // return throwError(() => new Response(false, null, err));
      })
    );
  }
}
