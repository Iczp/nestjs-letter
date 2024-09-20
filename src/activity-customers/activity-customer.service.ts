import { Injectable } from '@nestjs/common';

import { ActivityCustomerGetListInput } from './activity-customer.dto';
import { BaseActivityCustomerService } from './activity-customer.service.base';

@Injectable()
export class ActivityCustomerService extends BaseActivityCustomerService<ActivityCustomerGetListInput> {
  constructor() {
    super();
  }
}
