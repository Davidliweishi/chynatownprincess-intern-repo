import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class EmailProcessor extends WorkerHost {
    process(job: Job): Promise<void>;
}
