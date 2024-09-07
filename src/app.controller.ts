import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppInfo } from './dtos/AppInfo';
import { AllowAnonymous } from './auth/allowAnonymousKey.decorator';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('about')
  @ApiOperation({
    summary: '关于 App 信息',
    description: '返回 AppInfo',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully.',
    type: AppInfo,
  })
  @AllowAnonymous()
  getAbout() {
    return this.appService.getAppInfo();
  }
}
