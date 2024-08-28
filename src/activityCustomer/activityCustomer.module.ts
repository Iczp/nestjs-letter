import { Module } from '@nestjs/common';
import { ActivityCustomerService } from './activityCustomer.service';
import { ActivityCustomerController } from './activityCustomer.controller';

@Module({
  providers: [ActivityCustomerService],
  controllers: [ActivityCustomerController],
})
export class ActivityCustomerModule {}
