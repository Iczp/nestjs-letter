import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { CrudBaseController } from 'src/bases/CrudController';
import { UserDto } from './dtos/UserDto';
import { UserDetailDto } from './dtos/UserDetailDto';
import { UserCreateInput } from './dtos/UserCreateInput';
import { UserUpdateInput } from './dtos/UserUpdateInput';
import { UserGetListInput } from './dtos/UserGetListInput';

@Controller('user')
@ApiTags('user')
export class UserController extends CrudBaseController<
  UserDto,
  UserDetailDto,
  UserGetListInput,
  UserCreateInput,
  UserUpdateInput
> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  override create(input: UserCreateInput): Promise<UserDetailDto> {
    return super.create(input);
  }
}
