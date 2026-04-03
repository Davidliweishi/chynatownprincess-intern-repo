import { AppService } from './app.service';
import { CreateCatDto } from './users/dto/create-cat.dto';
export declare class CatsController {
    create(createCatDto: CreateCatDto): CreateCatDto;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
}
