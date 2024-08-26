import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { UserCreateInput } from './dtos/UserCreateInput';
import { UserUpdateInput } from './dtos/UserUpdateInput';
import { UserDto } from './dtos/UserDto';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import { PagedRequestInput } from 'src/dtos/PagedRequestInput';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    // super();
  }

  @Get('')
  async getList(
    @Query() input: PagedRequestInput,
  ): Promise<PagedResultDto<UserDto>> {
    console.log(input);

    const entities = await this.userService.getList(
      input.keyword,
      input.maxResultCount,
    );
    const items = entities.map((item) => {
      return <UserDto>{
        name: item.name,
        userType: item.user_type,
        gender: item.gender,
        phone: item.phone,
        is_enabled: item.is_enabled,
      };
    });

    return new PagedResultDto<UserDto>(items.length, items);
  }

  @Get(':id')
  async getItem(@Param('id') id: string) {
    console.log(id);
    return this.userService.getItem(id);
  }

  @Post('')
  async create(@Body() body: UserCreateInput) {
    return await this.userService.create(body);
  }

  @Put(':id')
  async upate(@Param('id') id: string, @Body() input: UserUpdateInput) {
    return this.userService.update(id, input);
  }

  @Delete(':id')
  async delete(@Query() id: string) {
    return this.userService.delete(id);
  }
}
