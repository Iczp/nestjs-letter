/* eslint-disable @typescript-eslint/no-unused-vars */
import { PagedRequestInput } from 'src/dtos/PagedRequestInput';
import { ICrudService } from './ICrudService';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import e, { createClient } from 'dbschema/edgeql-js'; // auto-generated code
import { ObjectTypeExpression } from 'dbschema/edgeql-js/typesystem';
import { $expr_PathNode } from 'dbschema/edgeql-js/path';

const client = createClient();

export abstract class CrudService<TDto, TDetailDto, TCreateInput, TUpdateInput>
  implements ICrudService<TDto, TDetailDto, TCreateInput, TUpdateInput>
{
  public abstract entityName: string;
  public abstract entity: ObjectTypeExpression | $expr_PathNode;

  protected itemQuery(id: string, entity: ObjectTypeExpression): object {
    return entity['*'];
  }

  public mapToUpdateEntity(
    entity: any,
    input: TUpdateInput,
  ): { [x: string]: any } {
    const result = {};
    if (entity.last_modification_time) {
      result['last_modification_time'] = e.datetime_current();
    }
    return {
      ...result,
      ...input,
    };
  }

  public mapToCreateEntity(
    entity: any,
    input: TCreateInput,
  ): { [x: string]: any } {
    return {
      ...input,
    };
  }

  public mapToDto(item: any): TDto {
    return item as TDto;
  }
  public mapToDetailDto(item: any): TDetailDto {
    return item as TDetailDto;
  }

  public async getItem(id: string): Promise<TDetailDto> {
    const prams = this.itemQuery(id, this.entity) as object;
    console.log('getItem id', id);
    console.log('getItem prams', prams);

    const query = e.select(this.entity, (entity) => ({
      filter_single: e.op(entity['id'], '=', e.uuid(id)),
      ...prams,
    }));
    const ret = await query.run(client);
    console.log('getItem result', ret);
    return this.mapToDetailDto(ret);
  }

  public async getList(
    input: PagedRequestInput,
  ): Promise<PagedResultDto<TDto>> {
    const totalCount = e.count(
      e.select(e.User, (entity) => ({
        filter: e.op(entity.is_deleted, '=', e.bool(false)),
      })),
    );

    console.log('totalCount', totalCount);

    const list = e.select(this.entity, (entity) => ({
      ...entity['*'],
      offset: e.int64(input.skin),
      limit: e.int64(input.maxResultCount),
      filter: e.op(entity['is_deleted'], '=', e.bool(false)),
      order_by: [
        {
          expression: entity['creation_time'],
          direction: e.ASC,
          empty: e.EMPTY_LAST,
        },
      ],
    }));

    // const entities = await query.run(client);
    const ret = await e.select({ totalCount, list }).run(client);

    const items = (Array.isArray(ret.list) ? ret.list : [ret.list]).map(
      (item) => {
        return this.mapToDto(item);
      },
    );

    return new PagedResultDto<TDto>(ret.totalCount, items);
  }
  public async create(input: TCreateInput): Promise<TDetailDto> {
    const queryCreate = e.insert(
      this.entity as $expr_PathNode,
      this.mapToCreateEntity(this.entity, input) as never,
    );
    const queryDisplay = e.select(queryCreate, (entity) => ({
      ...entity['*'],
    }));
    const ret = await queryDisplay.run(client);
    return this.mapToDetailDto(ret);
  }
  public async update(id: string, input: TUpdateInput): Promise<TDetailDto> {
    const queryUpdate = e.update(this.entity, (entity) => {
      const params = { ...this.mapToUpdateEntity(entity, input) };
      if (entity['last_modification_time']) {
        params['last_modification_time'] = e.datetime_current();
      }
      return {
        filter: e.op(entity['id'], '=', e.uuid(id)),
        set: params,
      };
    });

    const queryDisplay = e.select(queryUpdate, (entity) => ({
      ...entity['*'],
      order_by: [
        {
          expression: entity['creation_time'],
          direction: e.DESC,
          empty: e.EMPTY_LAST,
        },
      ],
    }));
    const item = await queryDisplay.run(client);

    return this.mapToDetailDto(item);
  }

  public async delete(id: string): Promise<void> {
    // const queryDelete = e.delete(this.entity, (entity) => ({
    //   filter_single: e.op(entity[id], '=', e.uuid(id)),
    // }));

    const queryUpdate = e.update(this.entity, (entity) => ({
      filter_single: e.op(entity['id'], '=', e.uuid(id)),
      set: {
        is_deleted: e.bool(true),
        deletion_time: e.datetime_current(),
      },
    }));

    const result = await queryUpdate.run(client);
    console.log(result);
  }
}
