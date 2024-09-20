import { Injectable } from '@nestjs/common';
import { ActivityCustomerInvitersGetListInput } from './activity-customer-inviters.dto';
import { BaseActivityCustomerService } from 'src/activity-customers/activity-customer.service.base';
import { Filters } from 'src/common/Filters';
import { e } from 'src/edgedb';
import { $expr_Operator } from 'dbschema/edgeql-js/funcops';
import { $bool } from 'dbschema/edgeql-js/modules/std';
import { Cardinality } from 'edgedb/dist/reflection';

@Injectable()
export class ActivityCustomerInvitersService extends BaseActivityCustomerService<ActivityCustomerInvitersGetListInput> {
  protected override listFilter(
    input: ActivityCustomerInvitersGetListInput,
    entity,
  ) {
    input.inviter_user_id = this.currentUserId;
    return super.listFilter(input, entity);
  }

  protected currentUserOp(entity: any) {
    return e.op(
      entity.inviterConfig.inviter.id,
      '=',
      e.uuid(this.currentUserId),
    );
  }

  protected override itemFilter(id: string, entity?: any) {
    return new Filters([
      super.itemFilter(id, entity),
      this.currentUserOp(entity),
    ]).and();
  }

  protected override deleteFilter(
    id: string,
    entity: any,
  ): $expr_Operator<$bool, Cardinality.One> {
    return new Filters([
      super.itemFilter(id, entity),
      this.currentUserOp(entity),
    ]).and();
  }
}
