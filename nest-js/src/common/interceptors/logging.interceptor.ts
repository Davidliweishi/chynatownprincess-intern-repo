import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { randomUUID } from 'crypto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    const { method, url, headers, ip } = req;
    const body = req.body as Record<string, unknown>;
    const requestId = randomUUID();
    const startTime = Date.now();

    this.logger.log({
      event: 'request',
      requestId,
      method,
      url,
      ip,
      userAgent: headers['user-agent'],
      body: this.sanitizeBody(body),
    });

    return next.handle().pipe(
      tap((responseBody: unknown) => {
        const duration = Date.now() - startTime;
        this.logger.log({
          event: 'response',
          requestId,
          method,
          url,
          statusCode: res.statusCode,
          duration: `${duration}ms`,
          body: this.sanitizeBody(responseBody),
        });
      }),

      catchError((err: Error & { status?: number }) => {
        const duration = Date.now() - startTime;
        this.logger.error({
          event: 'response_error',
          requestId,
          method,
          url,
          statusCode: err.status ?? 500,
          duration: `${duration}ms`,
          error: {
            name: err.name,
            message: err.message,
            stack: err.stack,
          },
        });
        return throwError(() => err);
      }),
    );
  }

  private sanitizeBody(body: unknown): unknown {
    const SENSITIVE_KEYS = [
      'password',
      'token',
      'secret',
      'authorization',
      'creditCard',
    ];

    if (!body || typeof body !== 'object') return body;

    return JSON.parse(
      JSON.stringify(body, (key: string, value: unknown) =>
        SENSITIVE_KEYS.includes(key.toLowerCase()) ? '[REDACTED]' : value,
      ),
    ) as unknown;
  }
}