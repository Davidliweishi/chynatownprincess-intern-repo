import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('welcome')
  async sendEmail(@Body('to') to: string) {
    await this.emailService.sendWelcomeEmail(to);
    return { message: 'Email job queued!' };
  }
}