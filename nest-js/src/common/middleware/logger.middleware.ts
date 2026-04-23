// src/common/middleware/logger.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction } from 'express';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: FastifyRequest, res: FastifyReply, next: NextFunction): void {
    const { method, url } = req;
    const userAgent = req.headers['user-agent'] ?? '';  // ✅ Use headers object
    const ip = req.ip;  // ✅ Use req.ip directly
    const startTime = Date.now();
    const logger = this.logger;

    // ✅ CAPTURE original send
    const originalSend = res.send;

    // ✅ MODIFY: Override send
    res.send = function (data: any) {
      const duration = Date.now() - startTime;
      const statusCode = res.statusCode;

      logger.log(
        `${method} ${url} ${statusCode} — ${duration}ms | ${ip} | ${userAgent}`,
      );

      const wrappedResponse = {
        success: statusCode >= 200 && statusCode < 300,
        statusCode,
        timestamp: new Date().toISOString(),
        path: url,
        duration: `${duration}ms`,
        data: data,
      };

      return originalSend.call(this, wrappedResponse);
    };

    next();
  }
}