import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  async process(job: Job) {
    console.log('🔥 WORKER HIT:', job.name, job.data);

    if (job.name === 'send-email') {
      console.log('Processing email job...');
      console.log('Sending email to:', job.data.email);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Email sent!');
    }
  }
}
