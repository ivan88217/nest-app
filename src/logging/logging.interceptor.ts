import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
          statusCode: response.statusCode,
          request: {
            params: JSON.stringify(request.params),
            query: JSON.stringify(request.query),
            body: JSON.stringify(request.body),
            headers: JSON.stringify(request.headers),
          },
          ms: Date.now() - now,
          response: {
            body: resBody,
            headers: JSON.stringify(response.getHeaders()),
          },
        }),
      ),
    );
  }
}
