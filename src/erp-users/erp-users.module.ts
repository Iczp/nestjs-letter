import { Module } from '@nestjs/common';
import { ErpUsersService } from './erp-users.service';
import { ErpUsersController } from './erp-users.controller';

@Module({
  providers: [ErpUsersService],
  controllers: [ErpUsersController],
})
export class ErpUsersModule {}
