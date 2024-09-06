import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleCreateInput } from './dtos/RoleCreateInput';
import { RoleUpdateInput } from './dtos/RoleUpdateInput';
import { RoleDto } from './dtos/RoleDto';
import { RoleDetailDto } from './dtos/RoleDetailDto';
import { RoleGetListInput } from './dtos/RoleGetListInput';
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
  ): Promise<PagedResultDto<RoleDto>> {
    return super.getList(input);
  }

  @Get(':id')
  @ApiOperation({ summary: '角色详情' })
  public override getItem(@Param('id') id: string): Promise<RoleDetailDto> {
    return super.getItem(id);
  }

  @Post()
  @ApiOperation({ summary: '创建角色' })
  public override create(
    @Body() input: RoleCreateInput,
  ): Promise<RoleDetailDto> {
    return super.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改角色' })
  public override update(
    @Param('id') id: string,
    input: RoleUpdateInput,
  ): Promise<RoleDetailDto> {
    return super.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  public override delete(id: string): Promise<void> {
    return super.delete(id);
  }
}
