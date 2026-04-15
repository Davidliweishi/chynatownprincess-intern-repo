import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  getHello(): string {
    return 'Hello World!';
  }
}

// Helps us know where the log is coming from 