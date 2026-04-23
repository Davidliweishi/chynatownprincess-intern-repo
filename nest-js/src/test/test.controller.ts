import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Public()
  @Get()
  test() {
    // Line 11: Breakpoint 1 - Start here
    console.log('Step 1: In test() controller method');
    
    // Line 14: We'll step into this function
    const userName = this.testService.getUserName(1);
    console.log(`Got user name: ${userName}`);
    
    // Line 17: Another function call
    const userData = this.testService.getUserData(1);
    console.log(`Got user data:`, userData);
    
    // Line 20: Return response
    return { 
      message: 'test complete',
      userName,
      userData 
    };
  }
}