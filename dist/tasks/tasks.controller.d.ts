import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    sendEmail(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    generateReport(body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
}
