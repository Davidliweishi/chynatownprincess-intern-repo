import { Queue } from 'bullmq';
export declare class EmailService {
    private readonly emailQueue;
    constructor(emailQueue: Queue);
    sendWelcomeEmail(to: string): Promise<{
        queued: boolean;
    }>;
}
