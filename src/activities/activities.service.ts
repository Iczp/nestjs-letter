import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/bases/CrudService';

import { Filters } from 'src/common/Filters';
import { PromiseResult } from 'src/types/PromiseResult';
import {
  ActivityCreateInput,
  ActivityDetailDto,
  ActivityDto,
  ActivityGetListInput,
  ActivityTemplageInput,
  ActivityUpdateInput,
} from './activities.dto';
import { isEmpty } from 'src/common/validator';
import { client, e } from 'src/edgedb';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import { ObjectResult } from 'src/types/ObjectResult';
import { Assert } from 'src/common';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override listSelect(input: ActivityGetListInput, entity?: any) {
    return {
      // ...entity['*'],
      // content: undefined,
      // image_base64: undefined,
      // image_crop: undefined,
      id: true,
      title: true,
      cover_url: true,
      description: true,
      max_count: true,
      start_time: true,
      end_time: true,
      is_actived: true,
      creation_time: true,
      is_enabled: true,
      is_image_seted: true,
      image_size: true,
      customers_count: true,
      inviter_configs_count: true,
    };
  }

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

  public override mapToUpdateEntity(
    input: ActivityUpdateInput,
    entity: any,
  ): ObjectResult {
    // const entity = e.Activity;
    return {
      title: input.title ?? entity.title,
      cover_url: input.cover_url ?? '',
      description: input.description ?? entity.description,
      address: input.address ?? entity.address,
      max_count: input.max_count ?? entity.max_count,
      start_time: input.start_time ?? entity.start_time,
      end_time: input.end_time ?? entity.end_time,
      is_actived:
        input.is_actived !== undefined ? input.is_actived : entity.is_actived,
      is_enabled:
        input.is_enabled !== undefined ? input.is_enabled : entity.is_enabled,
    };
  }

  public override mapToCreateEntity(input: ActivityCreateInput): PromiseResult {
    return Promise.resolve({
      title: input.title,
      cover_url: input.cover_url,
      description: input.description,
      address: input.address,
      max_count: input.max_count,
      start_time: input.start_time,
      end_time: input.end_time,
      is_actived: input.is_actived,
    });
  }

  protected override async checkDelete(idList: string[]): Promise<void> {
    await super.checkDelete(idList);
    const items = await e
      .select(e.Activity, (x) => ({
        id: true,
        title: true,
        inviter_configs_count: true,
        filter: new Filters([
          e.op(x.id, 'in', e.set(...idList.map(e.uuid))),
          e.op(x.inviter_configs_count, '>', 0),
        ]).and(),
        limit: 1,
      }))
      .run(client);

    Assert.If(
      items.length > 0,
      () => `'${items[0].title}' 邀请人为 ${items[0].title},请先清空后再删除`,
    );
  }

  public async setTemplate(
    id: string,
    image_mimetype: string,
    base64: string,
    input: ActivityTemplageInput,
  ): Promise<ObjectResult> {
    return await this.updateEntity(id, {
      is_image_seted: true,
      image_mimetype,
      image_base64: base64,
      image_crop: input.body,
      image_last_modification_time: e.datetime_current(),
    });
  }
}
