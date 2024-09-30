import { Injectable } from '@nestjs/common';
import { ActivityCustomerInvitersGetListInput } from './activity-customer-inviters.dto';
import { BaseActivityCustomerService } from 'src/activity-customers/activity-customer.service.base';
import { Filters } from 'src/common/Filters';
import { client, e } from 'src/edgedb';
import { $expr_Operator } from 'dbschema/edgeql-js/funcops';
import { $bool } from 'dbschema/edgeql-js/modules/std';
import { Cardinality } from 'edgedb/dist/reflection';
import { Assert } from 'src/common';

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
    idList: string[],
    entity: any,
  ): $expr_Operator<$bool, Cardinality.One> {
    return new Filters([
      super.deleteFilter(idList, entity),
      this.currentUserOp(entity),
    ]).and();
  }

  protected override async checkDelete(idList: string[]): Promise<void> {
    await super.checkDelete(idList);
    const items = await e
      .select(e.Activity, (x) => ({
        id: true,
        inviter_name: true,
        customers_count: true,
        filter: new Filters([
          e.op(x.id, 'in', e.set(...idList.map(e.uuid))),
          e.op(x.customers_count, '>', 0),
        ]).and(),
        limit: 1,
      }))
      .run(client);

    Assert.If(
      items.length > 0,
      () =>
        `'${items[0].inviter_name}' 邀请的客户数为 ${items[0].customers_count},请先清空后再删除`,
    );
  }
}
