import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppInfo } from './dtos/AppInfo';
import { AllowAnonymous } from './auth/allowAnonymousKey.decorator';
import { getFieldsFromEdgeDB } from './edgedb';
import { PagedResultDto } from './dtos/PagedResultDto';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  @ApiOperation({
    summary: '关于 App Test',
  })
  // @AllowAnonymous()
  async getInfo(@Req() req: any) {
    const user = req.user || null;
    const body = req.body;
    // console.log('req', req);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return {
      ip,
      user,
      body,
    };
  }

  @Get('tables')
  @ApiOperation({
    summary: 'get tables',
  })
  // @AllowAnonymous()
  async getTables() {
    const items = await getFieldsFromEdgeDB();
    return new PagedResultDto(items.length, items);
  }
  @Get('table')
  @ApiOperation({
    summary: 'get table',
  })
  // @AllowAnonymous()
  async getTable(@Query('name') name: string) {
    const items = await getFieldsFromEdgeDB(name);
    return items.length > 0 ? items[0] : null;
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
  getAbout() {
    return this.appService.getAppInfo();
  }
}
