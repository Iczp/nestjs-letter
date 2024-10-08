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
  RoleCreateInput,
  RoleDetailDto,
  RoleDto,
  RoleGetListInput,
  RoleUpdateInput,
  SetPermissionsInput,
} from './roles.dto';
import { CrudController } from 'src/bases/CrudController';
import { RolesService } from './roles.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import { RolesPermissions } from 'src/app.permissions';

@Controller('roles')
@ApiTags('Roles 角色管理')
export class RolesController extends CrudController<
  RoleDto,
  RoleDetailDto,
  RoleGetListInput,
  RoleCreateInput,
  RoleUpdateInput
> {
  override Policy_GetItem = RolesPermissions.Roles_GetItem;
  override Policy_GetList = RolesPermissions.Roles_GetList;
  override Policy_Create = RolesPermissions.Roles_Create;
  override Policy_Update = RolesPermissions.Roles_Update;
  override Policy_Delete = RolesPermissions.Roles_Delete;
  override Policy_Set_IsEnabled = RolesPermissions.Roles_Set_IsEnabled;
  override Policy_Excel_Import = RolesPermissions.Roles_Excel_Import;
  override Policy_Excel_Ouput = RolesPermissions.Roles_Excel_Ouput;
  override Policy_Excel_Tpl = RolesPermissions.Roles_Excel_Tpl;
  protected Policy_Set_Permissions = RolesPermissions.Roles_Set_Permissions;
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }

  @Get()
  @ApiOperation({ summary: '角色列表' })
  public override async getList(
    input: RoleGetListInput,
    @Req() req: any,
  ): Promise<PagedResultDto<RoleDto>> {
    return await super.getList(input, req);
  }

  @Get(':id')
  @ApiOperation({ summary: '角色详情' })
  public override async getItem(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<RoleDetailDto> {
    return await super.getItem(id, req);
  }

  @Post()
  @ApiOperation({ summary: '创建角色' })
  public override async create(
    @Body() input: RoleCreateInput,
    @Req() req: any,
  ): Promise<RoleDetailDto> {
    return await super.create(input, req);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改角色' })
  public override async update(
    @Param('id') id: string,
    input: RoleUpdateInput,
    @Req() req: any,
  ): Promise<RoleDetailDto> {
    return await super.update(id, input, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  public override async delete(id: string, @Req() req: any): Promise<void> {
    return await super.delete(id, req);
  }

  @Put('permissions/:id')
  @ApiOperation({ summary: '设置权限' })
  public async setPermissions(
    @Param('id') id: string,
    @Body() input: SetPermissionsInput,
    @Req() req: any,
  ) {
    this.setServiceRequest(req);
    await this.checkPolicyName(req, this.Policy_Set_Permissions);
    return await this.rolesService.setPermissions(id, input);
  }
}
