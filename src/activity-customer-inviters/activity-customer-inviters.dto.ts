import { ApiProperty } from '@nestjs/swagger';
import {
  ActivityCustomerCreateInput,
  ActivityCustomerDto,
  ActivityCustomerGetListInput,
  ActivityCustomerUpdateInput,
} from 'src/activity-customers/activity-customer.dto';

export class ActivityCustomerInvitersUpdateInput extends ActivityCustomerUpdateInput {}

export class ActivityCustomerInvitersCreateInput extends ActivityCustomerCreateInput {}

export class ActivityCustomerInvitersDto extends ActivityCustomerDto {}

export class ActivityCustomerInvitersDetailDto extends ActivityCustomerInvitersDto {}

export class ActivityCustomerInvitersGetListInput extends ActivityCustomerGetListInput {
  @ApiProperty({
    required: false,
    default: null,
    description: '邀请人用户ErpUserId(当前登录人,不用填)',
    enum: [],
  })
  override inviter_erp_user_id?: string;

  @ApiProperty({
    required: false,
    default: null,
    description: '邀请人用户Id(当前登录人,不用填)',
    enum: [],
  })
  override inviter_user_id?: string;
}
