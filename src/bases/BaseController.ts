import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { IService } from './IService';
import { Assert, Checker } from 'src/common';
import { getGranted } from 'src/edgedb';
import { Logger } from '@nestjs/common';
import { AppPermissionsObject } from 'src/app.consts';
// import { UseGuards } from '@nestjs/common';
// import { ApiKeyGuard } from '../api-key/api-key.guard';

// @ApiHeader({
//   name: 'x-user-id',
//   description: 'x-user-id',
// })
// @UseGuards(ApiKeyGuard)
@ApiSecurity('erp-user-id') // 将 API Key 鉴权配置到 Swagger 文档中
@ApiBearerAuth('bearer')
export class BaseController {
  constructor(protected service?: IService) {
    // 1. 当前用户注入
    // 2. 权限校验
  }

  protected setServiceRequest(req: any): void {
    this.service.setRequest(req);
  }

  protected async checkPolicyName(req: any, policyName: string | string[]) {
    if (Checker.isEmpty(policyName)) {
      return;
    }

    const policyNames = Array.isArray(policyName) ? policyName : [policyName];
    const undefinition = policyNames.filter((x) => !AppPermissionsObject[x]);
    Assert.If(
      undefinition.length > 0,
      `未定义权限(${undefinition.length}): ${undefinition.join(',')} `,
    );

    const userId = req.user?.id;

    console.log('req.user:', req.user);

    console.log('policyNames:', policyNames);

    Assert.If(!Checker.isGuid(userId), '当前用户未登录，请先登录', 401);

    Logger.log(`userId:${userId}`, BaseController.name);

    const granted = await getGranted(userId, policyNames);

    const grantedRoles = granted.map((x) => x.role.name);

    // Logger.log(granted, BaseController.name);

    Logger.log(
      `Authorized roles:[${grantedRoles.join(',')}]`,
      BaseController.name,
    );

    Assert.If(granted.length === 0, `未授权:[${policyNames.join(',')}]`);
  }
}
