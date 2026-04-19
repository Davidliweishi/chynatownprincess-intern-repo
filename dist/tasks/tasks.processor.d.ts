import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class TasksProcessor extends WorkerHost {
    process(job: Job): Promise<void>;
    private sendEmail;
}
