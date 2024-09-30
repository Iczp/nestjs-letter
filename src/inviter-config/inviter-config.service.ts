import { Injectable, Logger } from '@nestjs/common';
import { CrudService } from 'src/bases/CrudService';
import { PromiseResult } from 'src/types/PromiseResult';
import { Filters } from 'src/common/Filters';
import { e } from 'src/edgedb';
import { Assert, Checker } from 'src/common';
import {
  InviterConfigCreateInput,
  InviterConfigDetailDto,
  InviterConfigDto,
  InviterConfigGetListInput,
  InviterConfigUpdateInput,
} from './inviter-config.dto';
import { ExtractDBType } from 'src/types/ExtractDBType';
@Injectable()
export class InviterConfigService extends CrudService<
  InviterConfigDto,
  InviterConfigDetailDto,
  InviterConfigGetListInput,
  InviterConfigCreateInput,
  InviterConfigUpdateInput
> {
  public readonly entity = e.InviterConfig;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override listSelect(input: InviterConfigGetListInput, entity: any) {
    return {
      ...entity['*'],
      id: true,
      max_count: true,
      customer_count: true,
      activity: {
        id: true,
        title: true,
      },
      inviter: {
        id: true,
        name: true,
        account: true,
      },
      creation_time: true,
      last_modification_time: true,
    };
  }

  protected override itemSelect(id: string, entity: any): object {
    return {
      ...entity['*'],
      activity: {
        id: true,
        title: true,
      },
      inviter: {
        id: true,
        name: true,
        account: true,
      },
    };
  }

  protected override listFilter(
    input: InviterConfigGetListInput,
    entity: ExtractDBType<typeof e.InviterConfig>,
    // entity: any,
  ) {
    Assert.If(
      !Checker.isEmpty(input.activity_id) && !Checker.isGuid(input.activity_id),
      '活动ID格式错误',
    );
    Assert.If(
      !Checker.isEmpty(input.inviter_user_id) &&
        !Checker.isGuid(input.inviter_user_id),
      '邀请人ID格式错误',
    );
    return new Filters([e.op(entity.is_deleted, '=', e.bool(false))])

      .addIf(!Checker.isEmpty(input.activity_id), () =>
        e.op(
          (entity.activity as unknown as ExtractDBType<typeof e.Activity>).id,
          '?=',
          e.uuid(input.activity_id),
        ),
      )
      .addIf(!Checker.isEmpty(input.inviter_user_id), () =>
        e.op(
          (entity.inviter as unknown as ExtractDBType<typeof e.User>).id,
          '?=',
          e.uuid(input.inviter_user_id),
        ),
      )
      .addIf(!Checker.isEmpty(input.inviter_erp_user_id), () =>
        e.op(
          (entity.inviter as unknown as ExtractDBType<typeof e.User>)
            .erp_user_id,
          '?=',
          e.str(input.inviter_erp_user_id),
        ),
      )
      .addIf(!Checker.isEmpty(input.keyword), () =>
        new Filters([
          e.op(
            (entity.inviter as unknown as ExtractDBType<typeof e.User>).name,
            'ilike',
            e.cast(e.str, `%${input.keyword}%`),
          ),
          e.op(
            (entity.activity as unknown as ExtractDBType<typeof e.Activity>)
              .title,
            'ilike',
            e.cast(e.str, `%${input.keyword}%`),
          ),
        ]).any(),
      )
      .and();
  }

  public override mapToUpdateEntity(
    input: InviterConfigUpdateInput,
  ): PromiseResult {
    const entity = e.InviterConfig;

    const dto = {
      max_count: input.max_count ?? entity.max_count,
      is_enabled: input.is_enabled ?? entity.is_enabled,
    };
    Logger.log(
      `mapToUpdateEntity: ${JSON.stringify(dto)}`,
      InviterConfigService.name,
    );
    return Promise.resolve(dto);
  }

  public override mapToCreateEntity(
    input: InviterConfigCreateInput,
  ): PromiseResult {
    return Promise.resolve({
      activity: e.select(e.Activity, (x) => ({
        filter: e.op(x.id, '=', e.uuid(input.activity_id)),
      })),
      inviter: e.select(e.User, (x) => ({
        filter: e.op(x.id, '=', e.uuid(input.inviter_user_id)),
      })),
      max_count: input.max_count,
      is_enabled: input.is_enabled,
    });
  }

  public async getItemByUserId(userId: string) {
    Assert.IfNotGuid(userId, '用户ID格式错误');
    const ret = await this.getList({ inviter_user_id: userId });
    Assert.If(ret.items.length == 0, '该用户没有配置');
    return ret.items[0];
  }
}
