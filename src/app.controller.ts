import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health')
  healthCheck(): object {
    return this.appService.healthCheck();
  }
}
