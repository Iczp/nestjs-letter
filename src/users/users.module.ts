import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { CurrentUser } from './users.current';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, CurrentUser, JwtService],
  controllers: [UsersController],
  exports: [],
  imports: [],
})
export class UsersModule {}
