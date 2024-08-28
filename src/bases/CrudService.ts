/* eslint-disable @typescript-eslint/no-unused-vars */

import { ICrudService } from './ICrudService';
import { PagedResultDto } from 'src/dtos/PagedResultDto';
import e, { createClient } from 'dbschema/edgeql-js'; // auto-generated code
import { ObjectTypeExpression } from 'dbschema/edgeql-js/typesystem';

import { GetListInput } from './GetListInput';
import { NotFoundException } from '@nestjs/common';

import { $expr_PathNode } from 'dbschema/edgeql-js/path';
import { $expr_Operator } from 'dbschema/edgeql-js/funcops';
import { $bool } from 'dbschema/edgeql-js/modules/std';
import { Cardinality, PrimitiveTypeSet } from 'dbschema/edgeql-js/reflection';
import { AddIf } from 'src/common/AddIf';

const client = createClient();

export abstract class CrudService<
  TDto,
  TDetailDto,
  TGetListInput extends GetListInput,
  TCreateInput,
  TUpdateInput,
> implements
    ICrudService<TDto, TDetailDto, TGetListInput, TCreateInput, TUpdateInput>
{
  // constructor(private readonly entity: ObjectTypeExpression | $expr_PathNode) {}
  public abstract entity: ObjectTypeExpression | $expr_PathNode;

  public fi(
    currentExpr: any,
    condition: boolean,
    newExpr: $expr_Operator<$bool, Cardinality>,
    operator: any = 'and',
  ) {
    if (condition) {
      return e.op(currentExpr, operator, newExpr);
    }
    return currentExpr;
  }

  public itemSelect(id: string, entity: ObjectTypeExpression): object {
    return entity['*'];
  }

  public createSelect(input: TCreateInput): object {
    return this.entity['*'];
  }

  public updateSelect(id: string, input: TUpdateInput): object {
    return this.entity['*'];
  }

  public listSelect(input: TGetListInput): object {
    return this.entity['*'];
  }

  public listFilter(input: TGetListInput) {
    return e.op(this.entity['id'], '=', e.bool(false));
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
    console.log('getItem id', id);
    const query = e.select(this.entity, (entity) => {
      const fi = new AddIf([e.op(entity['id'], '=', e.uuid(id))])
        .addIf(
          entity['is_deleted'],
          e.op(entity['is_deleted'], '=', e.bool(false)),
        )
        .toArray();
      return {
        filter_single: e.all(e.set(...fi)),
        ...this.itemSelect(id, this.entity),
      };
    });
    const ret = await query.run(client);

    console.log('getItem result', ret);

    if (!ret) {
      throw new NotFoundException(`Item not found,id:${id}`);
    }
    return this.mapToDetailDto(ret);
  }

  public async getList(input: TGetListInput): Promise<PagedResultDto<TDto>> {
    const totalCount = e.count(
      e.select(this.entity as any, (entity) => ({
        filter: this.listFilter(input),
      })),
    );

    console.log('totalCount', totalCount);

    const list = e.select(this.entity, (entity) => {
      return {
        offset: e.int64(input.skip),
        limit: e.int64(input.maxResultCount),
        filter: this.listFilter(input),
        order_by: [
          {
            expression: entity['creation_time'],
            direction: e.ASC,
            empty: e.EMPTY_LAST,
          },
        ],
        ...this.listSelect(input),
      };
    });

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
    console.log('create input', input);

    const queryCreate = e.insert(
      this.entity as $expr_PathNode,
      this.mapToCreateEntity(this.entity, input) as never,
    );
    const c = await queryCreate.run(client);

    const queryDisplay = e.select(queryCreate, (entity) => ({
      ...this.createSelect(input),
    }));
    const ret = await queryDisplay.run(client);
    return this.mapToDetailDto(ret);
  }
  public async update(id: string, input: TUpdateInput): Promise<TDetailDto> {
    const queryUpdate = e.update(this.entity, (entity) => {
      return {
        filter: e.op(entity['id'], '=', e.uuid(id)),
        set: {
          last_modification_time: e.datetime_current(),
          ...this.mapToUpdateEntity(entity, input),
        },
      };
    });

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
