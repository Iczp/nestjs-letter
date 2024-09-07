import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CurrentUser } from './user.current';

@Module({
  providers: [UserService, CurrentUser],
  controllers: [UserController],
})
export class UserModule {}
