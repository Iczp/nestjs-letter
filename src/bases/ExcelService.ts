import {
  $expr_PathNode,
  ObjectTypeExpression,
} from 'dbschema/edgeql-js/reflection';
import { IExcelService } from './IExcelService';
import { Column, Workbook } from 'exceljs';
import { ExcelWorkbook } from 'src/dtos/ExcelWorkbook';
import { SchemaType } from 'src/types/SchemaType';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';
import { getFieldsFromEdgeDB } from 'src/edgedb';
import { BaseService } from './BaseService';
import { Req } from '@nestjs/common';

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
    @Req() req: any,
  ): Promise<ExcelImportResult> {
    // throw new Error('Method [importExcel] not implemented.');
    this.setRequest(req);
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

  public async getSchemaInfo(schema?: string): Promise<SchemaType> {
    const items = await getFieldsFromEdgeDB(schema);
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
