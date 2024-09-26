import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  InviterConfigCreateInput,
  InviterConfigDetailDto,
  InviterConfigDto,
  InviterConfigGetListInput,
  InviterConfigPagedResult,
  InviterConfigUpdateInput,
} from './inviter-config.dto';
import { CrudController } from 'src/bases/CrudController';
import { InviterConfigService } from './inviter-config.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as InviterConfigPermissions from './inviter-config.permissions';
import { CurrentUserApiTags } from 'src/app.consts';

@Controller('inviter-config')
@ApiTags('InviterConfig 邀请人配置')
export class InviterConfigController extends CrudController<
  InviterConfigDto,
  InviterConfigDetailDto,
  InviterConfigGetListInput,
  InviterConfigCreateInput,
  InviterConfigUpdateInput
> {
  override Policy_GetItem = InviterConfigPermissions.InviterConfig_GetItem;
  override Policy_GetList = InviterConfigPermissions.InviterConfig_GetList;
  override Policy_Create = InviterConfigPermissions.InviterConfig_Create;
  override Policy_Update = InviterConfigPermissions.InviterConfig_Update;
  override Policy_Delete = InviterConfigPermissions.InviterConfig_Delete;
  override Policy_Set_IsEnabled =
    InviterConfigPermissions.InviterConfig_Set_IsEnabled;
  override Policy_Excel_Import =
    InviterConfigPermissions.InviterConfig_Excel_Import;
  override Policy_Excel_Ouput =
    InviterConfigPermissions.InviterConfig_Excel_Ouput;
  override Policy_Excel_Tpl = InviterConfigPermissions.InviterConfig_Excel_Tpl;

  protected Policy_GetItem_ByCurrentUser =
    InviterConfigPermissions.InviterConfig_GetItem_ByCurrentUser;

  constructor(private readonly inviterConfigService: InviterConfigService) {
    super(inviterConfigService);
  }

  @Get()
  @ApiOperation({ summary: '邀请人列表' })
  public override async getList(
    input: InviterConfigGetListInput,
    @Req() req: any,
  ): Promise<InviterConfigPagedResult> {
    return await super.getList(input, req);
  }

  @Get(':id')
  @ApiOperation({ summary: '邀请人详情' })
  public override async getItem(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<InviterConfigDetailDto> {
    return await super.getItem(id, req);
  }

  @Get('current-user/item')
  @ApiOperation({ summary: '邀请人详情' })
  @ApiTags(CurrentUserApiTags)
  public async getItemByCurrentUser(
    @Req() req: any,
  ): Promise<InviterConfigDetailDto> {
    const userId = req.user?.id;
    await this.checkPolicyName(req, this.Policy_GetItem_ByCurrentUser);
    return await this.inviterConfigService.getItemByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: '创建邀请人' })
  public override async create(
    @Body() input: InviterConfigCreateInput,
    @Req() req: any,
  ): Promise<InviterConfigDetailDto> {
    return await super.create(input, req);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改邀请人' })
  public override async update(
    @Param('id') id: string,
    input: InviterConfigUpdateInput,
    @Req() req: any,
  ): Promise<InviterConfigDetailDto> {
    return await super.update(id, input, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除邀请人' })
  public override async delete(id: string, @Req() req: any): Promise<void> {
    return await super.delete(id, req);
  }
}
