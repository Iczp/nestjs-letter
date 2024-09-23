import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import {
  AuditLogCreateInput,
  AuditLogDetailDto,
  AuditLogDto,
  AuditLogGetListInput,
  AuditLogPagedResult,
  AuditLogUpdateInput,
} from './audits.dto';
import { CrudController } from 'src/bases/CrudController';
import { AuditsService } from './audits.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuditsPermissions } from 'src/app.permissions';

@Controller('audits')
@ApiTags('Audits 审计日志管理')
export class AuditsController extends CrudController<
  AuditLogDto,
  AuditLogDetailDto,
  AuditLogGetListInput,
  AuditLogCreateInput,
  AuditLogUpdateInput
> {
  override Policy_GetItem = AuditsPermissions.AuditLog_GetItem;
  override Policy_GetList = AuditsPermissions.AuditLog_GetList;
  override Policy_Create = AuditsPermissions.AuditLog_Create;
  override Policy_Update = AuditsPermissions.AuditLog_Update;
  override Policy_Delete = AuditsPermissions.AuditLog_Delete;
  override Policy_Excel_Import = AuditsPermissions.AuditLog_Excel_Import;
  override Policy_Excel_Ouput = AuditsPermissions.AuditLog_Excel_Ouput;
  override Policy_Excel_Tpl = AuditsPermissions.AuditLog_Excel_Tpl;

  constructor(private readonly rolesService: AuditsService) {
    super(rolesService);
  }

  @Get()
  @ApiOperation({ summary: '审计日志列表' })
  public override async getList(
    input: AuditLogGetListInput,
    @Req() req: any,
  ): Promise<AuditLogPagedResult> {
    return await super.getList(input, req);
  }

  @Get(':id')
  @ApiOperation({ summary: '审计日志详情' })
  public override async getItem(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<AuditLogDetailDto> {
    return await super.getItem(id, req);
  }

  // @Post()
  @ApiOperation({ summary: '创建审计日志' })
  public override async create(
    @Body() input: AuditLogCreateInput,
    @Req() req: any,
  ): Promise<AuditLogDetailDto> {
    return await super.create(input, req);
  }

  // @Put(':id')
  @ApiOperation({ summary: '修改审计日志' })
  public override async update(
    @Param('id') id: string,
    input: AuditLogUpdateInput,
    @Req() req: any,
  ): Promise<AuditLogDetailDto> {
    return await super.update(id, input, req);
  }

  // @Delete(':id')
  @ApiOperation({ summary: '删除审计日志' })
  public override async delete(id: string, @Req() req: any): Promise<void> {
    return await super.delete(id, req);
  }
}
