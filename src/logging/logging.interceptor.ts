import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from '@/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    this.logger.log(`[${method}] ${url} - Request`);

    return next.handle().pipe(
      tap((resBody) =>
        this.logger.log({
          method,
          url,
          request: {
            params: JSON.stringify(request.params),
            query: JSON.stringify(request.query),
            body: JSON.stringify(request.body),
            headers: JSON.stringify(request.headers),
          },
          ms: Date.now() - now,
          response: {
            statusCode: response.statusCode,
            body: resBody,
            headers: JSON.stringify(response.getHeaders()),
          },
        }),
      ),
      catchError((error) => {
        let statusCode = 500; // default to 500 if the error is not an HttpException
        if (error instanceof HttpException) {
          statusCode = error.getStatus();
        }
        this.logger.error({
          method,
          url,
          request: {
            params: JSON.stringify(request.params),
            query: JSON.stringify(request.query),
            body: JSON.stringify(request.body),
            headers: JSON.stringify(request.headers),
          },
          ms: Date.now() - now,
          response: {
            statusCode: statusCode,
            body: error,
            headers: JSON.stringify(response.getHeaders()),
          },
        });

        throw error;
      }),
    );
  }
}
