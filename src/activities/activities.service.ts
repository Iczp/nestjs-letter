import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/bases/CrudService';

import { Filters } from 'src/common/Filters';
import { PromiseResult } from 'src/types/PromiseResult';
import {
  ActivityCreateInput,
  ActivityDetailDto,
  ActivityDto,
  ActivityGetListInput,
  ActivityUpdateInput,
} from './activities.dto';
import { isEmpty } from 'src/common/validator';
import { e } from 'src/edgedb';
import { PagedResultDto } from 'src/dtos/PagedResultDto';

@Injectable()
export class ActivitiesService extends CrudService<
  ActivityDto,
  ActivityDetailDto,
  ActivityGetListInput,
  ActivityCreateInput,
  ActivityUpdateInput
> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getListByUserId(userId: string): Promise<PagedResultDto<ActivityDto>> {
    const ret = await this.getList({ user_id: userId, maxResultCount: 99 });
    ret.input = {
      current_user_id: userId,
    };
    return ret;
  }
  public readonly entity = e.Activity;

  protected override listFilter(
    input: ActivityGetListInput,
    // entity: ExtractDBType<typeof e.Activity>,
    entity: any,
  ): any {
    return new Filters([e.op(entity.is_deleted, '=', e.bool(false))])
      .addIf(!isEmpty(input.is_enabled), () =>
        e.op(entity.is_enabled, '=', e.bool(input.is_enabled)),
      )
      .addIf(!isEmpty(input.start_time), () =>
        e.op(entity.start_time, '>=', e.datetime(input.start_time)),
      )
      .addIf(!isEmpty(input.end_time), () =>
        e.op(entity.end_time, '<', e.datetime(input.end_time)),
      )
      .addIf(!isEmpty(input.user_id), () =>
        e.op(entity.inviterConfigs.inviter.id, '?=', e.uuid(input.user_id)),
      )
      .addIf(!isEmpty(input.erp_user_id), () =>
        e.op(
          entity.inviterConfigs.inviter.erp_user_id,
          '?=',
          e.str(input.erp_user_id),
        ),
      )
      .addIf(!isEmpty(input.keyword), () =>
        new Filters([
          e.op(entity.title, 'ilike', e.str(`%${input.keyword}%`)),
        ]).any(),
      )
      .and();
  }

  public override mapToUpdateEntity(input: ActivityUpdateInput): PromiseResult {
    const entity = e.Activity;
    return Promise.resolve({
      title: input.title ?? entity.title,
      coverUrl: input.coverUrl ?? entity.coverUrl,
      description: input.description ?? entity.description,
      address: input.address ?? entity.address,
      max_count: input.max_count ?? entity.max_count,
      start_time: input.start_time ?? entity.start_time,
      end_time: input.end_time ?? entity.end_time,
      is_actived:
        input.is_actived !== undefined ? input.is_actived : entity.is_actived,
    });
  }

  public override mapToCreateEntity(input: ActivityCreateInput): PromiseResult {
    return Promise.resolve({
      title: input.title,
      coverUrl: input.coverUrl,
      description: input.description,
      address: input.address,
      max_count: input.max_count,
      start_time: input.start_time,
      end_time: input.end_time,
      is_actived: input.is_actived,
    });
  }
}
