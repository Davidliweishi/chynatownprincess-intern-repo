"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const crypto_1 = require("crypto");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const http = context.switchToHttp();
        const req = http.getRequest();
        const res = http.getResponse();
        const { method, url, headers, ip } = req;
        const body = req.body;
        const requestId = (0, crypto_1.randomUUID)();
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
        return next.handle().pipe((0, rxjs_1.tap)((responseBody) => {
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
        }), (0, rxjs_1.catchError)((err) => {
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
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
    sanitizeBody(body) {
        const SENSITIVE_KEYS = [
            'password',
            'token',
            'secret',
            'authorization',
            'creditCard',
        ];
        if (!body || typeof body !== 'object')
            return body;
        return JSON.parse(JSON.stringify(body, (key, value) => SENSITIVE_KEYS.includes(key.toLowerCase()) ? '[REDACTED]' : value));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map