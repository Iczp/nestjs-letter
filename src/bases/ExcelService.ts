import {
  $expr_PathNode,
  ObjectTypeExpression,
} from 'dbschema/edgeql-js/reflection';
import { IExcelService } from './IExcelService';
import { Column, Workbook } from 'exceljs';
import { ExcelWorkbook } from 'src/dtos/ExcelWorkbook';
import { SchemaType } from 'src/types/SchemaType';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';
import { client } from 'src/edgedb';
import { BaseService } from './BaseService';

export abstract class ExcelService<TGetListInput>
  extends BaseService
  implements IExcelService<TGetListInput>
{
  // constructor(private readonly entity: ObjectTypeExpression | $expr_PathNode) {}
  constructor() {
    super();
  }

  public abstract entity: ObjectTypeExpression | $expr_PathNode;

  public async importExcel(
    workbook: Workbook,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request?: any,
  ): Promise<ExcelImportResult> {
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

  public getTitle(annotations: any): string | null {
    const arr = annotations ?? [];
    if (Array.isArray(arr) && arr.length > 0) {
      return arr[0]['@value'];
    }
    return null;
  }

  public async getSchemaInfo(schema?: string): Promise<SchemaType> {
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

    const ret = await client.queryJSON(queryJson);
    // console.log('ret', ret);

    const items = (JSON.parse(ret) as any[]).map((x) => ({
      name: x.name as string,
      title: this.getTitle(x.annotations),
      properties: x.properties.map((p) => ({
        name: p.name,
        title: this.getTitle(p.annotations),
      })),
    }));

    // console.log('items', JSON.stringify(items, null, 2));

    return items[0];
  }

  public getExcelFilename(schemaInfo: SchemaType): string {
    return schemaInfo.name.substring('default::'.length);
  }

  public getExampleExcelFilename(schemaInfo: SchemaType): string {
    return schemaInfo.name.substring('default::'.length) + '-example';
  }

  public getSheetName(schemaInfo: SchemaType): string {
    return schemaInfo.title ?? schemaInfo.name ?? 'Sheet1';
  }
  public getExampleSheetName(schemaInfo: SchemaType): string {
    return schemaInfo.title ?? schemaInfo.name ?? 'ExampleSheet1';
  }

  public getColumns(schemaInfo: SchemaType): Promise<Partial<Column>[]> {
    return Promise.resolve(
      schemaInfo.properties
        .filter((x) => x.title)
        .map((x) => ({
          header: x.title ?? x.name,
          key: x.name,
          width: 24,
        })),
    );
  }
  public getExampleColumns(schemaInfo: SchemaType): Promise<Partial<Column>[]> {
    return Promise.resolve(
      schemaInfo.properties
        .filter((x) => x.title)
        .map((x) => ({
          header: x.title ?? x.name,
          key: x.name,
          width: 24,
        })),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getRows(input: TGetListInput): Promise<any[]> {
    return Promise.resolve([]);
  }
  public getExampleRows(): Promise<any[]> {
    return Promise.resolve([]);
  }

  private async createExcel(args: {
    input?: TGetListInput;
    getColumns: (
      schemaInfo: SchemaType,
      input?: TGetListInput,
    ) => Promise<Partial<Column>[]>;
    getName: (schemaInfo: SchemaType, input?: TGetListInput) => string;
    getRows: (input?: TGetListInput) => Promise<any[]>;
    getExcelFilename: (schemaInfo: SchemaType, input?: TGetListInput) => string;
  }): Promise<ExcelWorkbook> {
    console.log('createExcel');
    const schemaInfo = await this.getSchemaInfo();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(args.getName(schemaInfo));
    worksheet.columns = await args.getColumns(schemaInfo);
    const rows = await args.getRows(args.input);
    for (const row of rows) {
      worksheet.addRow(row);
    }
    const filename = (
      args.getExcelFilename(schemaInfo) ?? new Date().getTime().toString()
    ).replace(/[\\\/:*?"<>|]/g, '');

    return { workbook, filename: `${filename}.xlsx` };
  }

  public async generateExcel(input: TGetListInput): Promise<ExcelWorkbook> {
    console.log('generateExcel');
    const schemaInfo = await this.getSchemaInfo();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(this.getSheetName(schemaInfo));
    worksheet.columns = await this.getColumns(schemaInfo);
    const rows = await this.getRows(input);
    for (const row of rows) {
      worksheet.addRow(row);
    }
    const filename = (
      this.getExcelFilename(schemaInfo) ?? new Date().getTime().toString()
    ).replace(/[\\\/:*?"<>|]/g, '');

    return { workbook, filename: `${filename}.xlsx` };
  }

  public async generateExampleExcel(): Promise<ExcelWorkbook> {
    console.log('generateExcel');
    const schemaInfo = await this.getSchemaInfo();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(
      this.getExampleSheetName(schemaInfo),
    );
    worksheet.columns = await this.getExampleColumns(schemaInfo);
    const rows = await this.getExampleRows();
    for (const row of rows) {
      worksheet.addRow(row);
    }
    const filename = (
      this.getExampleExcelFilename(schemaInfo) ??
      new Date().getTime().toString()
    ).replace(/[\\\/:*?"<>|]/g, '');

    return { workbook, filename: `${filename}.xlsx` };
  }
}
