// tasks.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('send-email')
  async sendEmail(@Body() body: { email: string }) {
    await this.tasksService.sendWelcomeEmail(body.email);
    return { message: 'Email job queued!' };
  }

  @Post('report')
  async generateReport(@Body() body: { userId: string }) {
    await this.tasksService.generateReport(body.userId);
    return { message: 'Report job queued!' };
  }
}
