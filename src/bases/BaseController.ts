import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { IService } from './IService';

// import { UseGuards } from '@nestjs/common';
// import { ApiKeyGuard } from '../api-key/api-key.guard';

// @ApiHeader({
//   name: 'x-api-key',
//   description: 'api-key',
// })
// @UseGuards(ApiKeyGuard)
@ApiSecurity('api-key') // 将 API Key 鉴权配置到 Swagger 文档中
@ApiBearerAuth('bearer')
export class BaseController {
  constructor(protected service?: IService) {
    // 1. 当前用户注入
    // 2. 权限校验
  }

  protected setServiceRequest(req: any): void {
    this.service.setRequest(req);
  }
}
