import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { randomUUID } from 'crypto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const req = http.getRequest<FastifyRequest>();
    const res = http.getResponse<FastifyReply>();

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
      // MODIFY: Transform the response data
      map((responseBody: unknown) => {
        const duration = Date.now() - startTime;
        const statusCode = res.statusCode;

        // ANALYZE: Log response
        this.logger.log({
          event: 'response',
          requestId,
          method,
          url,
          statusCode,
          duration: `${duration}ms`,
          body: this.sanitizeBody(responseBody),
        });

        // WRAP: Return modified response
        return {
          success: statusCode >= 200 && statusCode < 300,
          statusCode,
          timestamp: new Date().toISOString(),
          path: url,
          duration: `${duration}ms`,
          requestId,
          data: responseBody,
        };
      }),

      catchError((err: Error & { status?: number }) => {
        const duration = Date.now() - startTime;
        const statusCode = err.status ?? 500;

        // ANALYZE: Log error
        this.logger.error({
          event: 'response_error',
          requestId,
          method,
          url,
          statusCode,
          duration: `${duration}ms`,
          error: {
            name: err.name,
            message: err.message,
            stack: err.stack,
          },
        });

        // WRAP: Return error in standard format
        const errorResponse = {
          success: false,
          statusCode,
          timestamp: new Date().toISOString(),
          path: url,
          duration: `${duration}ms`,
          requestId,
          error: {
            message: err.message,
            name: err.name,
          },
        };

        // Send wrapped error
        res.send(errorResponse);
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