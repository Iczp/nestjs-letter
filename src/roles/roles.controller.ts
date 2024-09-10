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

@Controller('roles')
@ApiTags('Roles')
export class RolesController extends CrudController<
  RoleDto,
  RoleDetailDto,
  RoleGetListInput,
  RoleCreateInput,
  RoleUpdateInput
> {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }

  @Get()
  @ApiOperation({ summary: '角色列表' })
  public override getList(
    input: RoleGetListInput,
    @Req() req: any,
  ): Promise<PagedResultDto<RoleDto>> {
    return super.getList(input, req);
  }

  @Get(':id')
  @ApiOperation({ summary: '角色详情' })
  public override getItem(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<RoleDetailDto> {
    return super.getItem(id, req);
  }

  @Post()
  @ApiOperation({ summary: '创建角色' })
  public override create(
    @Body() input: RoleCreateInput,
    @Req() req: any,
  ): Promise<RoleDetailDto> {
    return super.create(input, req);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改角色' })
  public override update(
    @Param('id') id: string,
    input: RoleUpdateInput,
    @Req() req: any,
  ): Promise<RoleDetailDto> {
    return super.update(id, input, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  public override delete(id: string, @Req() req: any): Promise<void> {
    return super.delete(id, req);
  }

  @Put('permissions/:id')
  @ApiOperation({ summary: '设置权限' })
  public setPermissions(
    @Param('id') id: string,
    @Body() input: SetPermissionsInput,
    @Req() req: any,
  ) {
    this.setServiceRequest(req);
    return this.rolesService.setPermissions(id, input);
  }
}
