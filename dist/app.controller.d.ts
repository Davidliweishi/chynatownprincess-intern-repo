import { AppService } from './app.service';
import { CreateCatDto } from './users/dto/create-cat.dto';
import { EmailService } from './email/email.service';
export declare class CatsController {
    create(createCatDto: CreateCatDto): CreateCatDto;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
}
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    queueWelcome(to: string): Promise<{
        queued: boolean;
    }>;
}
