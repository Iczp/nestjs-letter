import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { CrudBaseController } from 'src/bases/CrudController';

@Controller('user')
@ApiTags('user')
export class UserController extends CrudBaseController {
  constructor(private readonly userService: UserService) {
    super();
    this.service = userService;
  }
}
