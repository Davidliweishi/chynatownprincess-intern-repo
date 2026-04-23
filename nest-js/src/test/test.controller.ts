import { Controller, Get, Logger } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  private readonly logger = new Logger(TestController.name);

  constructor(private testService: TestService) {}

  @Public()
  @Get()
  test() {
    // Log that the method was called
    this.logger.log('Step 1: In test() controller method');
    
    // Call service and log result
    const userName = this.testService.getUserName(1);
    this.logger.log(`Got user name: ${userName}`);
    
    // Another service call
    const userData = this.testService.getUserData(1);
    this.logger.log(`Got user data:`, JSON.stringify(userData));
    
    // Return response
    return { 
      message: 'test complete',
      userName,
      userData 
    };
  }
}