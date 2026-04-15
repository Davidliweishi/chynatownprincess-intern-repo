import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'send-welcome-email':
        this.logger.log(`Sending welcome email to ${job.data.to}`);
        // put actual email logic here
        return { sent: true };

      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }
}