/* eslint-disable @typescript-eslint/no-unused-vars */
import { PagedRequestInput } from 'src/dtos/PagedRequestInput';
import { ICrudService } from './ICrudService';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import e, { createClient } from 'dbschema/edgeql-js'; // auto-generated code
import { ObjectTypeExpression } from 'dbschema/edgeql-js/typesystem';
import { $expr_PathNode } from 'dbschema/edgeql-js/path';

const client = createClient();

export abstract class CrudService<TDto, TDetailDto, TCteateInput, TUpdateInput>
  implements ICrudService<TDto, TDetailDto, TCteateInput, TUpdateInput>
{
  public abstract entityName: string;
  public abstract entity: ObjectTypeExpression | $expr_PathNode;

  protected itemQuery(id: string, obj: ObjectTypeExpression): object {
    return obj['*'];
  }

  mapToDto(item: any): TDto {
    return item as TDto;
  }
  mapToDetailDto(item: any): TDetailDto {
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
  public async create(input: TCteateInput): Promise<TDetailDto> {
    const queryCreate = e.insert(
      this.entity as $expr_PathNode,
      {
        ...(input as object),
      } as never,
    );

    const queryDisplay = e.select(queryCreate, () => ({
      id: true,
      name: true,
      //   age: true,
      //   height: true,
      //   is_deceased: true,
    }));
    const ret = await queryDisplay.run(client);
    return this.mapToDetailDto(ret);
  }
  public update(id: string, input: TUpdateInput): Promise<TDetailDto> {
    throw new Error('Method not implemented.');
  }
  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
