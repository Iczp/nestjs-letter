import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/bases/BaseController';
import { ErpUsersService } from './erp-users.service';
import { ErpUsersPermissions } from 'src/app.permissions';
import {
  ErpUsersDto,
  ErpUsersGetListInput,
  ErpUsersPagedResult,
} from './erp-users.dto';
@Controller('erp-users')
@ApiTags('ERP-Users ERP 用户管理')
export class ErpUsersController extends BaseController {
  protected GetListPolicyName = ErpUsersPermissions.ErpUsers_GetList;
  protected GetItemPolicyName = ErpUsersPermissions.ErpUsers_GetItem;

  constructor(private readonly erpUserService: ErpUsersService) {
    super();
  }
  @Get()
  @ApiOperation({ summary: 'ERP 用户列表' })
  async findAll(
    @Query() input: ErpUsersGetListInput,
    @Req() req: any,
  ): Promise<ErpUsersPagedResult> {
    await this.checkPolicyName(req, this.GetListPolicyName);
    return this.erpUserService.findAll(input);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ERP 用户详情' })
  async findOne(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<ErpUsersDto> {
    await this.checkPolicyName(req, this.GetItemPolicyName);
    return await this.erpUserService.findOne(id);
  }
}
