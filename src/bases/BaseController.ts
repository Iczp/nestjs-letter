import { ForbiddenException } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { isEmpty } from 'src/common/validator';
// import { UseGuards } from '@nestjs/common';
// import { ApiKeyGuard } from '../api-key/api-key.guard';

// @ApiHeader({
//   name: 'x-api-key',
//   description: 'api-key',
// })
// @UseGuards(ApiKeyGuard)
@ApiSecurity('api-key') // 将 API Key 鉴权配置到 Swagger 文档中
export class BaseController {
  constructor() {}

  public checkPolicy(prolicyName: string): Promise<void> {
    if (isEmpty(prolicyName)) {
      return;
    }
    throw new ForbiddenException();
  }
}
