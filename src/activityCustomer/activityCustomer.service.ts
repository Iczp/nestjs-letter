import { Injectable, NotAcceptableException } from '@nestjs/common';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { ActivityCustomerCreateInput } from './dtos/ActivityCustomerCreateInput';
import { ActivityCustomerUpdateInput } from './dtos/ActivityCustomerUpdateInput';
import { ActivityCustomerDto } from './dtos/ActivityCustomerDto';
import { CrudService } from 'src/bases/CrudService';
import { ActivityCustomerDetailDto } from './dtos/ActivityCustomerDetailDto';
import { ActivityCustomerGetListInput } from './dtos/ActivityCustomerGetListInput';
import { AddIf } from 'src/common/AddIf';
import { PromiseResult } from 'src/types/PromiseResult';
import { ExtractDBType } from 'src/types/ExtractDBType';

// dep = {
//   name: true,
//   users: {
//     name: true,
//     phone: true,
//     user_type: true,
//   },
// };

@Injectable()
export class ActivityCustomerService extends CrudService<
  ActivityCustomerDto,
  ActivityCustomerDetailDto,
  ActivityCustomerGetListInput,
  ActivityCustomerCreateInput,
  ActivityCustomerUpdateInput
> {
  // constructor() {
  //   super(e.ActivityCustomer);
  // }
  public readonly entity = e.ActivityCustomer;

  override listFilter(
    input: ActivityCustomerGetListInput,
    entity: ExtractDBType<typeof e.ActivityCustomer>,
  ): any {
    const fi = new AddIf([e.op(entity.is_deleted, '=', e.bool(false))])
      .addIf(
        input.is_checked !== undefined,
        e.op(entity.is_checked, '=', e.bool(input.is_checked)),
      )
      .addIf(
        input.is_invited !== undefined,
        e.op(entity.is_invited, '=', e.bool(input.is_invited)),
      )
      .addIf(
        input.is_enabled !== undefined,
        e.op(entity.is_enabled, '=', e.bool(input.is_enabled)),
      )
      .toArray();

    return e.all(e.set(...fi));
  }

  public override mapToUpdateEntity(
    input: ActivityCustomerUpdateInput,
  ): PromiseResult {
    const entity = e.ActivityCustomer;
    return Promise.resolve({
      customer_name: input.customer_name ?? entity.customer_name,
      customer_phone: input.customer_phone ?? entity.customer_phone,
      customer_gender: input.customer_gender ?? entity.customer_gender,
    });
  }

  public override async mapToCreateEntity(
    input: ActivityCustomerCreateInput,
  ): PromiseResult {
    const q = e.select(e.Activity, () => ({
      filter_single: { id: e.uuid(input.activity_id) },
    }));
    const activity = await q.run(this.client);
    console.log('mapToCreateEntity activity', activity);

    if (!activity) {
      throw new NotAcceptableException(`activity_id:${input.activity_id}`);
    }
    // e.assert({message:"xxxx"},e.op())
    return {
      activity: q,
      customer_name: input.customer_name,
      customer_gender: input.customer_gender,
      customer_phone: input.customer_phone,
      is_enabled: input.is_enabled,
    };
  }

  // public setCheck(id: string, is_checked: boolean) {
  //   return this.updateEntity(id, {
  //     is_checked: is_checked,
  //   });
  // }

  // public setIsInvited(id: string, is_invited: boolean) {
  //   return this.updateEntity(id, {
  //     is_invited: is_invited,
  //   });
  // }
}
