import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

@Controller('user')
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
  public override getList(
    input: UserGetListInput,
  ): Promise<PagedResultDto<UserDto>> {
    return super.getList(input);
  }

  @Get(':id')
  @ApiOperation({ summary: '用户详情' })
  public override getItem(@Param('id') id: string): Promise<UserDetailDto> {
    return super.getItem(id);
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  public override create(
    @Body() input: UserCreateInput,
  ): Promise<UserDetailDto> {
    return super.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改用户' })
  public override update(
    @Param('id') id: string,
    input: UserUpdateInput,
  ): Promise<UserDetailDto> {
    return super.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  public override delete(id: string): Promise<void> {
    return super.delete(id);
  }
}
