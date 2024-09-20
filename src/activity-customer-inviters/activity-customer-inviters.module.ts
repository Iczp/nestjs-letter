import { Module } from '@nestjs/common';
import { ActivityCustomerInvitersService } from './activity-customer-inviters.service';
import { ActivityCustomerInvitersController } from './activity-customer-inviters.controller';

@Module({
  controllers: [ActivityCustomerInvitersController],
  providers: [ActivityCustomerInvitersService],
})
export class ActivityCustomerInvitersModule {}
