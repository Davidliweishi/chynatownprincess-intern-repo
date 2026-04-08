import { Queue } from 'bullmq';
export declare class TasksService {
    private tasksQueue;
    constructor(tasksQueue: Queue);
    sendWelcomeEmail(email: string): Promise<void>;
    generateReport(userId: string): Promise<void>;
}
