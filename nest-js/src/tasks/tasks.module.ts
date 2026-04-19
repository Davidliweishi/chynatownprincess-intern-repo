// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TasksService } from './tasks.service';
import { TasksProcessor } from './tasks.processor';
import { TasksController } from './tasks.controller';
import { EmailProcessor } from '../email/email.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tasks',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksProcessor, EmailProcessor],
})
export class TasksModule {}