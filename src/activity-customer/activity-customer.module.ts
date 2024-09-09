import { Module } from '@nestjs/common';
import { ActivityCustomerService } from './activity-customer.service';
import { ActivityCustomerController } from './activity-customer.controller';

@Module({
  providers: [ActivityCustomerService],
  controllers: [ActivityCustomerController],
})
export class ActivityCustomerModule {}
