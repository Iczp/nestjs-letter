import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Scope,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';

import { CrudController } from 'src/bases/CrudController';
import {
  UserCreateInput,
  UserDetailDto,
  UserDto,
  UserGetListInput,
  UserUpdateInput,
} from './users.dto';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import { Authorize } from 'src/auth/Authorize.decorator';
import {
  Users_Create,
  Users_Delete,
  Users_GetItem,
  Users_GetList,
  Users_Update,
} from 'src/permissions/permissionsConsts';
import { input } from 'edgedb/dist/adapter.node';

@Controller({
  path: 'user',
  scope: Scope.REQUEST,
})
@ApiTags('Users')
export class UsersController extends CrudController<
  UserDto,
  UserDetailDto,
  UserGetListInput,
  UserCreateInput,
  UserUpdateInput
> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }
  @Get()
  @ApiOperation({ summary: '用户列表' })
  @Authorize({ policy: Users_GetList })
  public override getList(
    input: UserGetListInput,
    @Req() req: any,
  ): Promise<PagedResultDto<UserDto>> {
    return super.getList(input, req);
  }

  @Get('list')
  @ApiOperation({ summary: '用户列表' })
  public getList1(input: UserGetListInput, @Req() req) {
    console.log(req);
    return { user: req.user };
  }

  @Get(':id')
  @ApiOperation({ summary: '用户详情' })
  @Authorize({ policy: Users_GetItem })
  public override getItem(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<UserDetailDto> {
    return super.getItem(id, req);
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @Authorize({ policy: Users_Create })
  public override create(
    @Body() input: UserCreateInput,
    @Req() req: any,
  ): Promise<UserDetailDto> {
    return super.create(input, req);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改用户' })
  @Authorize({ policy: Users_Update })
  public override update(
    @Param('id') id: string,
    input: UserUpdateInput,
    @Req() req: any,
  ): Promise<UserDetailDto> {
    this.setServiceRequest(req);
    return super.update(id, input, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @Authorize({ policy: Users_Delete })
  public override delete(id: string, @Req() req: any): Promise<void> {
    return super.delete(id, req);
  }

  // @Get('test')
  // @ApiOperation({ summary: 'test' })
  // @Authorize({ policy: Users_Delete })
  // public override test(input:reqInput): Promise<void> {
  //   return input;
  // }
}
