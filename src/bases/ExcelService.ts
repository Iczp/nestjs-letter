import {
  $expr_PathNode,
  ObjectTypeExpression,
} from 'dbschema/edgeql-js/reflection';
import createClient from 'edgedb';
import { IExcelService } from './IExcelService';
import { Column, Workbook } from 'exceljs';
import { ExcelBookDto } from 'src/dtos/ExcelBookDto';
import { SchemaType } from 'src/types/SchemaType';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';

export abstract class ExcelService implements IExcelService {
  // constructor(private readonly entity: ObjectTypeExpression | $expr_PathNode) {}
  public abstract entity: ObjectTypeExpression | $expr_PathNode;

  public client = createClient();

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

    const ret = await this.client.queryJSON(queryJson);
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
    const filename = (
      schemaInfo.name.substring('default::'.length) ??
      new Date().getTime().toString()
    ).replace(/[\\\/:*?"<>|]/g, '');
    return `${filename}.xlsx`;
  }

  public getSheetName(schemaInfo: SchemaType, defaultName?: string): string {
    return schemaInfo.title ?? schemaInfo.name ?? defaultName ?? 'Sheet1';
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

  public getRows(): Promise<any[]> {
    return Promise.resolve([]);
  }

  public async generateExcel(workbook: Workbook): Promise<ExcelBookDto> {
    const schemaInfo = await this.getSchemaInfo();
    const worksheet = workbook.addWorksheet(this.getSheetName(schemaInfo));
    // console.log('generateExcelBook', schemaInfo);
    worksheet.columns = await this.getColumns(schemaInfo);
    for (const row of await this.getRows()) {
      worksheet.addRow(row);
    }
    const filename = this.getExcelFilename(schemaInfo);
    return { filename };
  }
}
