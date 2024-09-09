import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { CurrentUser } from './users.current';

@Module({
  providers: [UsersService, CurrentUser],
  controllers: [UsersController],
  exports: [UsersService, CurrentUser],
  imports: [],
})
export class UsersModule {}
