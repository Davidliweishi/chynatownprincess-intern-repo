import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue('email')
    private readonly emailQueue: Queue,
  ) {}

  async sendWelcomeEmail(to: string) {
    await this.emailQueue.add(
      'send-welcome-email',
      { to },
      {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    return { queued: true };
  }
}