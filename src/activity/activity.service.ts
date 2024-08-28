import { Injectable } from '@nestjs/common';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { ActivityCreateInput } from './dtos/ActivityCreateInput';
import { ActivityUpdateInput } from './dtos/ActivityUpdateInput';
import { ActivityDto } from './dtos/ActivityDto';
import { CrudService } from 'src/bases/CrudService';
import { ActivityDetailDto } from './dtos/ActivityDetailDto';
import { ActivityGetListInput } from './dtos/ActivityGetListInput';
import { AddIf } from 'src/common/AddIf';

@Injectable()
export class ActivityService extends CrudService<
  ActivityDto,
  ActivityDetailDto,
  ActivityGetListInput,
  ActivityCreateInput,
  ActivityUpdateInput
> {
  public readonly entity = e.Activity;

  override listFilter(input: ActivityGetListInput): any {
    const fi = new AddIf([e.op(e.Activity.is_deleted, '=', e.bool(false))])

      .addIf(
        input.is_enabled !== undefined,
        e.op(e.Activity.is_enabled, '=', e.bool(input.is_enabled)),
      )
      .toArray();

    return e.all(e.set(...fi));
  }

  public override mapToUpdateEntity(input: ActivityUpdateInput): {
    [x: string]: any;
  } {
    const entity = e.Activity;
    return {
      title: input.title ?? entity.title,
      coverUrl: input.coverUrl ?? entity.coverUrl,
      description: input.description ?? entity.description,
      address: input.address ?? entity.address,
      max_count: input.max_count ?? entity.max_count,
      start_time: input.start_time ?? entity.start_time,
      end_time: input.end_time ?? entity.end_time,
      is_actived:
        input.is_actived !== undefined ? input.is_actived : entity.is_actived,
    };
  }

  public override mapToCreateEntity(input: ActivityCreateInput): {
    [x: string]: any;
  } {
    return {
      title: input.title,
      coverUrl: input.coverUrl,
      description: input.description,
      address: input.address,
      max_count: input.max_count,
      start_time: input.start_time,
      end_time: input.end_time,
      is_actived: input.is_actived,
    };
  }
}
