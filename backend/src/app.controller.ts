import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  health(): { statusCode: number; message: string } {
    return { statusCode: 200, message: 'OK' };
  }
}
