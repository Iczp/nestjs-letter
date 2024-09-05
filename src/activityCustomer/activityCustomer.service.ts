import { Injectable, NotAcceptableException } from '@nestjs/common';
import e from 'dbschema/edgeql-js'; // auto-generated code
import { CrudService } from 'src/bases/CrudService';
import { ActivityCustomerCreateInput } from './dtos/ActivityCustomerCreateInput';
import { ActivityCustomerUpdateInput } from './dtos/ActivityCustomerUpdateInput';
import { ActivityCustomerDto } from './dtos/ActivityCustomerDto';
import { ActivityCustomerDetailDto } from './dtos/ActivityCustomerDetailDto';
import { ActivityCustomerGetListInput } from './dtos/ActivityCustomerGetListInput';
import { Filters } from 'src/common/Filters';
import { PromiseResult } from 'src/types/PromiseResult';
import { ExtractDBType } from 'src/types/ExtractDBType';
import { Column, Workbook } from 'exceljs';
import { SchemaType } from 'src/types/SchemaType';
import { GenderText } from 'src/enums/Gender';
import { exampleColumns, exampleRows } from './activityCustomer.example.data';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';
import { assert, checker } from 'src/common';
import { client } from 'src/edgedb';

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

  public override listSelect(
    input: ActivityCustomerGetListInput,
    entity: ExtractDBType<typeof e.ActivityCustomer>,
  ) {
    return {
      ...entity['*'],
      activity: {
        id: true,
        title: true,
      },
    };
  }

  override listFilter(
    input: ActivityCustomerGetListInput,
    entity: ExtractDBType<typeof e.ActivityCustomer>,
  ): any {
    return new Filters([e.op(entity.is_deleted, '=', e.bool(false))])
      .addIf(
        !checker.isEmpty(input.activity_id),
        e.op(entity.activity['id'], '=', e.uuid(input.activity_id)),
      )
      .addIf(
        !checker.isEmpty(input.is_checked),
        e.op(entity.is_checked, '=', e.bool(input.is_checked)),
      )
      .addIf(
        !checker.isEmpty(input.is_invited),
        e.op(entity.is_invited, '=', e.bool(input.is_invited)),
      )
      .addIf(
        !checker.isEmpty(input.is_enabled),
        e.op(entity.is_enabled, '=', e.bool(input.is_enabled)),
      )
      .all();
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
    const activity = await q.run(client);
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

  public override getExampleColumns(): Promise<Partial<Column>[]> {
    return Promise.resolve(exampleColumns);
  }

  public override getExampleRows(): Promise<any[]> {
    return Promise.resolve(exampleRows);
  }

  public override getSheetName(): string {
    return '客户列表';
  }

  public override getColumns(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    schemaInfo: SchemaType,
  ): Promise<Partial<Column>[]> {
    return Promise.resolve([
      { header: 'ID', key: 'id', width: 24 },
      { header: '活动名称', key: 'activity_id', width: 24 },
      { header: '客户姓名', key: 'customer_name', width: 24 },
      { header: '性别', key: 'customer_gender', width: 24 },
      { header: '客户手机', key: 'customer_phone', width: 24 },
      { header: '邀请人', key: 'inviter_name', width: 24 },
      { header: '是否已邀请', key: 'is_invited', width: 24 },
      { header: '是否签到', key: 'is_signed', width: 24 },
      { header: '是否赠送礼品', key: 'is_gifted', width: 24 },
      { header: '备注', key: 'inviter_name', width: 24 },
    ]);
  }

  public override async getRows(
    input: ActivityCustomerGetListInput,
  ): Promise<any[]> {
    console.log('input', input);

    const list = e.select(this.entity, (entity) => {
      const filter = this.listFilter(input, entity);

      return {
        ...entity['*'],
        activity_id: entity.activity.id,
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
      };
    });

    const items = await list.run(client);

    // console.log('items', items);

    return items.map((x) => ({
      id: x.id,
      activity_id: x.activity_id,
      customer_name: x.customer_name,
      customer_gender: GenderText[x.customer_gender],
      customer_phone: x.customer_phone,
      inviter_name: x.inviter_name,
      is_invited: x.is_invited ? '是' : '否',
      is_signed: x.is_signed ? '是' : '否',
      is_gifted: x.is_gifted ? '是' : '否',
      remarks: x.remarks,
    }));
  }

  public toCnBool(v: boolean): string {
    return v ? '是' : '否';
  }

  public toCnGender(gender: string): string {
    return gender ? '是' : '否';
  }

  public override async importExcel(
    workbook: Workbook,
    request: any,
  ): Promise<ExcelImportResult> {
    console.log('body', request.body);
    const activity_id = request.body.body;
    assert.If(
      !checker.isGuid(activity_id),
      `请输入正确的活动ID,${activity_id}`,
    );

    // console.log('activity_id', activity_id);

    const sheet = workbook.getWorksheet(1);
    const items = sheet.getRows(1, sheet.rowCount).map((x) => {
      return {
        customer_name: x.getCell(1).value as string,
        customer_gender: x.getCell(2).value,
        customer_phone: x.getCell(3).value,
        inviter_name: x.getCell(4).value,
        is_invited: x.getCell(5).value,
      };
    });

    console.log('items', items);
    // Nestjs 从Excel导入数据，并用edgedb-js 批量写入数据库
    const activity = e.select(e.Activity, () => ({
      filter_single: {
        id: e.uuid(activity_id),
      },
    }));
    const item = await activity.run(client);
    assert.If(!item, `不存在的活动,Id:${activity_id}`);
    const query = e.params({ items: e.json }, (params) => {
      return e.for(e.json_array_unpack(params.items), (item) => {
        return e.insert(e.ActivityCustomer, {
          // activity: e.cast(
          //   e.Activity,
          //   e.select(e.Activity, () => ({
          //     filter_single: {
          //       id: e.uuid(activity_id),
          //     },
          //   })),
          // ),
          // activity: e.select(e.Activity, () => ({
          //   filter_single: {
          //     id: e.uuid(activity_id),
          //   },
          // })),
          activity: activity as never,
          customer_name: e.cast(e.str, item.customer_name),
        });
      });
    });

    const result = await query.run(client, {
      items,
    });

    // console.log('result', result);

    return {
      ...(await super.importExcel(workbook, request)),
      data: result,
    };
  }
}
