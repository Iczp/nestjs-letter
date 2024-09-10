import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppInfo } from './dtos/AppInfo';
import { AllowAnonymous } from './auth/allowAnonymousKey.decorator';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  @ApiOperation({
    summary: '关于 App info',
  })
  // @AllowAnonymous()
  getInfo(@Req() req) {
    const user = req.user;
    const body = req.body;
    console.log('req', req);
    return {
      user,
      body,
    };
  }

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
  getAbout(@Req() req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return {
      ip,
      ...this.appService.getAppInfo(),
    };
  }
}
