// tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class TasksService {
  constructor(@InjectQueue('tasks') private tasksQueue: Queue) {}

  async sendWelcomeEmail(email: string) {
    await this.tasksQueue.add('send-email', {
      email,
      subject: 'Welcome!',
    });
  }

  async generateReport(userId: string) {
    // add with options: delay, attempts, backoff
    await this.tasksQueue.add(
      'generate-report',
      { userId },
      {
        delay: 5000,      // wait 5s before processing
        attempts: 3,      // retry up to 3 times on failure
        backoff: {
          type: 'exponential',
          delay: 2000,    // 2s, 4s, 8s between retries
        },
      },
    );
  }
}