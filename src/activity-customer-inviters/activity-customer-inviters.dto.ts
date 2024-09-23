import { ApiHideProperty } from '@nestjs/swagger';
import {
  ActivityCustomerCreateInput,
  ActivityCustomerDto,
  ActivityCustomerGetListInput,
  ActivityCustomerUpdateInput,
} from 'src/activity-customers/activity-customer.dto';
import { PagedResult } from 'src/dtos/PagedResultDto';

export class ActivityCustomerInvitersUpdateInput extends ActivityCustomerUpdateInput {}

export class ActivityCustomerInvitersCreateInput extends ActivityCustomerCreateInput {}

export class ActivityCustomerInvitersDto extends ActivityCustomerDto {}

export class ActivityCustomerInvitersDetailDto extends ActivityCustomerInvitersDto {}

export class ActivityCustomerInvitersGetListInput extends ActivityCustomerGetListInput {
  // @ApiProperty({
  //   required: false,
  //   description: '邀请人用户ErpUserId(当前登录人,不用填)',
  //   enum: [],
  // })
  @ApiHideProperty()
  override inviter_erp_user_id?: string;

  // @ApiProperty({
  //   required: false,
  //   description: '邀请人用户Id(当前登录人,不用填)',
  //   enum: [],
  // })
  @ApiHideProperty()
  override inviter_user_id?: string;
}

export class ActivityInput {
  constructor(input?: { [key: string]: any }) {
    if (input) {
      Object.assign(this, input);
    }
  }
  public id: string;
}

export class ActivityCustomerInvitersResult extends PagedResult {
  constructor(totalCount: number, items: ActivityCustomerDto[]) {
    super(totalCount, items);
  }
  override items: ActivityCustomerDto[];
}
