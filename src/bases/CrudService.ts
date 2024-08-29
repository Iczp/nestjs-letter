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
import { Cardinality } from 'dbschema/edgeql-js/reflection';
import { Filters } from 'src/common/Filters';
import { PromiseResult } from 'src/types/PromiseResult';
import { Column, Workbook } from 'exceljs';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';
import { ExcelBookDto } from 'src/dtos/ExcelBookDto';
import { SchemaType } from 'src/types/SchemaType';

// const a: ExtractDBType<typeof e.Area> = {

// }

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

  public client = createClient();

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

  public listFilter(input: TGetListInput, entity: any) {
    return e.op(this.entity['id'], '=', e.bool(false));
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
    console.log('getItem id', id);
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
    const ret = await query.run(this.client);

    console.log('getItem result', ret);

    if (!ret) {
      throw new NotFoundException(`Item not found,id:${id}`);
    }
    return await this.mapToDetailDto(ret);
  }

  public async getList(input: TGetListInput): Promise<PagedResultDto<TDto>> {
    // console.log('listFilter', filter);
    // console.log('toEdgeQL', filter.toEdgeQL());
    const totalCount = e.count(
      e.select(this.entity as any, (entity) => {
        const filter = this.listFilter(input, entity);
        return {
          filter,
        };
      }),
    );

    // console.log('totalCount', totalCount);

    const list = e.select(this.entity, (entity) => {
      const filter = this.listFilter(input, entity);

      return {
        offset: e.int64(input.skip),
        limit: e.int64(input.maxResultCount),
        filter,
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

    // const entities = await query.run(this.client);
    const ret = await e.select({ totalCount, list }).run(this.client);

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
    const ret = await queryDisplay.run(this.client);
    return await this.mapToDetailDto(ret);
  }

  public async updateEntity(id: string, obj: { [x: string]: any }) {
    const q = e.update(this.entity, (entity) => ({
      filter_single: e.op(entity['id'], '=', e.uuid(id)),
      set: obj,
    }));
    return await q.run(this.client);
  }

  public async update(id: string, input: TUpdateInput): Promise<TDetailDto> {
    const queryUpdate = e.update(this.entity, (entity) => {
      const inputDto = {
        last_modification_time: e.datetime_current(),
        ...this.mapToUpdateEntity(input),
      };
      console.log('update inputDto:', inputDto);

      return {
        filter_single: e.op(entity['id'], '=', e.uuid(id)),
        set: inputDto,
      };
    });
    const u1 = await queryUpdate.run(this.client);

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

    const item = await queryDisplay.run(this.client);

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

    const result = await queryUpdate.run(this.client);
    console.log(result);
  }

  public async importExcel(workbook: Workbook): Promise<ExcelImportResult> {
    // throw new Error('Method [importExcel] not implemented.');

    const sheets = workbook.worksheets.map((x) => ({
      name: x.name,
      state: x.state,
      rowCount: x.rowCount,
      // model: x.model,
    }));

    return await Promise.resolve({
      success: false,
      message: 'Method [importExcel] not implemented.',
      sheets,
    });
  }

  private getTitle(annotations: any): string | null {
    const arr = annotations ?? [];
    if (Array.isArray(arr) && arr.length > 0) {
      return arr[0]['@value'];
    }
    return null;
  }

  private async getSchemaInfo(schema?: string): Promise<SchemaType> {
    const schemaName = schema || this.entity['__element__']['__name__'];
    const queryJson = `
WITH MODULE schema
SELECT ObjectType {
  name,
   annotations: {
    @value,
  },
  properties: {
    name,
    annotations: {
      name,
      @value
    }
  }
}   FILTER .name = '${schemaName}';
    `;

    const ret = await this.client.queryJSON(queryJson);
    console.log('ret', ret);

    const items = (JSON.parse(ret) as any[]).map((x) => ({
      name: x.name as string,
      title: this.getTitle(x.annotations),
      properties: x.properties.map((p) => ({
        name: p.name,
        title: this.getTitle(p.annotations),
      })),
    }));

    console.log('items', JSON.stringify(items, null, 2));

    return items[0];
  }

  public getExcelFilename(schemaInfo: SchemaType): string {
    const filename = (
      schemaInfo.name ?? new Date().getTime().toString()
    ).replace(/[\\\/:*?"<>|]/g, '');
    return `${filename}.xlsx`;
  }

  public getSheetName(schemaInfo: SchemaType, defaultName?: string): string {
    return schemaInfo.title ?? schemaInfo.name ?? defaultName ?? 'Sheet1';
  }

  public getColumns(schemaInfo: SchemaType): Promise<Partial<Column>[]> {
    return Promise.resolve(
      schemaInfo.properties.map((x) => ({
        header: x.title ?? x.name,
        key: x.name,
        width: 24,
      })),
    );
  }

  public getRows(): Promise<any[]> {
    return Promise.resolve([]);
  }

  public async generateExcelBook(workbook: Workbook): Promise<ExcelBookDto> {
    const schemaInfo = await this.getSchemaInfo();
    const worksheet = workbook.addWorksheet(this.getSheetName(schemaInfo));
    console.log('generateExcelBook', schemaInfo);
    worksheet.columns = await this.getColumns(schemaInfo);
    for (const row of await this.getRows()) {
      worksheet.addRow(row);
    }
    const filename = this.getExcelFilename(schemaInfo);
    return { filename };
  }
}
