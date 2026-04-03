// tasks.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('tasks') // must match queue name
export class TasksProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    switch (job.name) {
      case 'send-email':
        console.log(`Sending email to: ${job.data.email}`);
        // your email logic here
        await this.sendEmail(job.data);
        break;

      case 'generate-report':
        console.log(`Generating report for user: ${job.data.userId}`);
        // your report logic here
        break;

      default:
        console.log(`Unknown job: ${job.name}`);
    }
  }

  private async sendEmail(data: { email: string; subject: string }) {
    // simulate async work
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Email sent to ${data.email}`);
  }
}