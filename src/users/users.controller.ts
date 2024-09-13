import {
  Body,
  Controller,
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
import { UsersPermisstions } from 'src/app.permisstions';

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
  override Policy_GetItem = UsersPermisstions.Users_GetItem;
  override Policy_GetList = UsersPermisstions.Users_GetList;
  override Policy_Create = UsersPermisstions.Users_Create;
  override Policy_Update = UsersPermisstions.Users_Update;
  override Policy_Delete = UsersPermisstions.Users_Delete;
  override Policy_Set_IsEnabled = UsersPermisstions.Users_Set_IsEnabled;
  override Policy_Excel_Import = UsersPermisstions.Users_Excel_Import;
  override Policy_Excel_Ouput = UsersPermisstions.Users_Excel_Ouput;
  override Policy_Excel_Tpl = UsersPermisstions.Users_Excel_Tpl;

  constructor(private readonly userService: UsersService) {
    super(userService);
  }
  @Get()
  @ApiOperation({ summary: '用户列表' })
  @Authorize({ policy: UsersPermisstions.Users_GetList })
  public override async getList(
    input: UserGetListInput,
    @Req() req: any,
  ): Promise<PagedResultDto<UserDto>> {
    return super.getList(input, req);
  }

  @Get(':id')
  @ApiOperation({ summary: '用户详情' })
  @Authorize({ policy: UsersPermisstions.Users_GetItem })
  public override getItem(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<UserDetailDto> {
    return super.getItem(id, req);
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @Authorize({ policy: UsersPermisstions.Users_Create })
  public override create(
    @Body() input: UserCreateInput,
    @Req() req: any,
  ): Promise<UserDetailDto> {
    return super.create(input, req);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改用户' })
  @Authorize({ policy: UsersPermisstions.Users_Update })
  public override update(
    @Param('id') id: string,
    input: UserUpdateInput,
    @Req() req: any,
  ): Promise<UserDetailDto> {
    this.setServiceRequest(req);
    return super.update(id, input, req);
  }

  // @Delete(':id')
  // @ApiOperation({ summary: '删除用户' })
  // @Authorize({ policy: UsersPermisstions.Users_Delete })
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
