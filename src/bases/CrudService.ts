/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICrudService } from './ICrudService';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { client } from 'src/edgedb';
import { GetListInput } from './GetListInput';
import { Logger, NotFoundException } from '@nestjs/common';
import { $expr_PathNode } from 'dbschema/edgeql-js/path';
import { Filters } from 'src/common/Filters';
import { PromiseResult } from 'src/types/PromiseResult';
import { ExcelService } from './ExcelService';
import { IService } from './IService';
import { Assert, Checker } from 'src/common';

export abstract class CrudService<
    TDto,
    TDetailDto,
    TGetListInput extends GetListInput,
    TCreateInput,
    TUpdateInput,
  >
  extends ExcelService<TGetListInput>
  implements
    ICrudService<TDto, TDetailDto, TGetListInput, TCreateInput, TUpdateInput>
{
  constructor() {
    // protected readonly currentUser: CurrentUser
    super();
  }
  // constructor(private readonly entity: ObjectTypeExpression | $expr_PathNode) {}
  // public abstract entity: ObjectTypeExpression | $expr_PathNode;
  // public client = createClient();

  public itemSelect(id: string, entity: any): object {
    return entity['*'];
  }

  public createSelect(input: TCreateInput): object {
    return this.entity['*'];
  }

  public updateSelect(id: string, input: TUpdateInput): object {
    return this.entity['*'];
  }

  public listSelect(input: TGetListInput, entity: any): any {
    return this.entity['*'];
  }

  public listFilter(input: TGetListInput, entity: any): any {
    return e.op(this.entity['is_deleted'], '=', e.bool(false));
  }

  public mapToUpdateEntity(input: TUpdateInput): PromiseResult {
    const result = {};
    if (this.entity['last_modification_time']) {
      result['last_modification_time'] = e.datetime_current();
    }
    return Promise.resolve({
      ...result,
      ...input,
    });
  }

  public mapToCreateEntity(input: TCreateInput): PromiseResult {
    return Promise.resolve({
      ...input,
    });
  }

  public mapToDto(item: any): Promise<TDto> {
    return Promise.resolve(item as TDto);
  }
  public mapToDetailDto(item: any): Promise<TDetailDto> {
    return Promise.resolve(item as TDetailDto);
  }

  public async getItem(id: string): Promise<TDetailDto> {
    Logger.log(`getItem id:${id}`, CrudService.name);
    Assert.IfNotGuid(id);
    const query = e.select(this.entity, (entity) => {
      const filter = new Filters([e.op(entity['id'], '=', e.uuid(id))])
        .addIf(
          entity['is_deleted'],
          e.op(entity['is_deleted'], '=', e.bool(false)),
        )
        .all();
      return {
        filter_single: filter,
        ...this.itemSelect(id, this.entity),
      };
    });
    const entity = await query.run(client);

    // console.log('getItem result', user);

    if (!entity) {
      throw new NotFoundException(`Item not found,id:${id}`);
    }
    return await this.mapToDetailDto(entity);
  }

  public async getList(input: TGetListInput): Promise<PagedResultDto<TDto>> {
    // console.log('listFilter', filter);
    // console.log('toEdgeQL', filter.toEdgeQL());
    Logger.log('getList input', 'getList');

    const totalCount = e.count(
      e.select(this.entity as any, (entity) => {
        const filter =
          this.listSelect(input, entity)?.filter ??
          this.listFilter(input, entity);
        return {
          filter,
        };
      }),
    );

    // console.log('totalCount', totalCount);

    const list = e.select(this.entity, (entity) => {
      const filter = this.listFilter(input, entity) || {};

      const order_by = [];
      if (entity['creation_time']) {
        order_by.push({
          expression: entity['creation_time'],
          direction: e.ASC,
          empty: e.EMPTY_LAST,
        });
      }

      const ql = {
        offset: e.int64(input.skip || 0),
        limit: e.int64(input.maxResultCount || 10),
        filter,
        order_by,
        ...this.listSelect(input, entity),
      };
      console.log('filter QL', ql.filter?.toEdgeQL());
      return ql;
    });

    // const entities = await query.run(client);
    const ret = await e.select({ totalCount, list }).run(client);

    const _items = Array.isArray(ret.list) ? ret.list : [ret.list];

    const promises = _items.map(async (item) => {
      const dto = await this.mapToDto(item);
      return dto;
    });

    const items = await Promise.all(promises);
    return new PagedResultDto<TDto>(ret.totalCount, items);
  }

  public async create(input: TCreateInput): Promise<TDetailDto> {
    const inputDto = await this.mapToCreateEntity(input);
    console.log('create inputDto', inputDto);
    const queryCreate = e.insert(
      this.entity as $expr_PathNode,
      inputDto as never,
    );

    const queryDisplay = e.select(queryCreate, () => this.createSelect(input));
    const ret = await queryDisplay.run(client);
    return await this.mapToDetailDto(ret);
  }

  public async updateEntity(id: string, obj: { [x: string]: any }) {
    const q = e.update(this.entity, (entity) => ({
      filter_single: e.op(entity['id'], '=', e.uuid(id)),
      set: obj,
    }));
    return await q.run(client);
  }

  public async update(id: string, input: TUpdateInput): Promise<TDetailDto> {
    const updateDto = await this.mapToUpdateEntity(input);
    console.log('update dto:', updateDto);
    const queryUpdate = e.update(this.entity, (entity) => ({
      filter_single: e.op(entity['id'], '=', e.uuid(id)),
      set: updateDto,
    }));
    const u1 = await queryUpdate.run(client);

    console.log('update result:', u1);

    const queryDisplay = e.select(queryUpdate, (entity) => ({
      order_by: [
        {
          expression: entity['creation_time'],
          direction: e.DESC,
          empty: e.EMPTY_LAST,
        },
      ],
      ...this.updateSelect(id, input),
    }));

    const item = await queryDisplay.run(client);

    if (!item) {
      throw new NotFoundException(`Item not found,id:${id}`);
    }

    return await this.mapToDetailDto(item);
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
