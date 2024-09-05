import {
  $expr_PathNode,
  ObjectTypeExpression,
} from 'dbschema/edgeql-js/reflection';
import createClient from 'edgedb';
import { IExcelService } from './IExcelService';
import { Column, Workbook } from 'exceljs';
import { ExcelWorkbook } from 'src/dtos/ExcelWorkbook';
import { SchemaType } from 'src/types/SchemaType';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';

export abstract class ExcelService<TGetListInput>
  implements IExcelService<TGetListInput>
{
  // constructor(private readonly entity: ObjectTypeExpression | $expr_PathNode) {}
  constructor() {
    // this.generateExcel = this.generateExcel.bind(this);
    // this.generateExampleExcel = this.generateExampleExcel.bind(this);
  }

  public abstract entity: ObjectTypeExpression | $expr_PathNode;

  public client = createClient({
    // host: '10.0.5.20',
    // database: 'main',
    // port: 10707,
    // user: 'edgedb',
    // password: 'edgedb',
    // tlsSecurity: 'insecure',
    port: 10707,
    user: 'edgedb',
    password: 'edgedb',
    database: 'main',
    // tls_cert_data:
    //   '-----BEGIN CERTIFICATE-----\nMIIC0zCCAbugAwIBAgIRAMVyZO69vECfvvc40kpgQeEwDQYJKoZIhvcNAQELBQAw\nGDEWMBQGA1UEAwwNRWRnZURCIFNlcnZlcjAeFw0yNDA4MjMxNTU0MDBaFw00MzEw\nMjQxNTU0MDBaMBgxFjAUBgNVBAMMDUVkZ2VEQiBTZXJ2ZXIwggEiMA0GCSqGSIb3\nDQEBAQUAA4IBDwAwggEKAoIBAQCpwEfNmDSLxDCnaOGFtJFG7yvQ9Qfnpyal8Ts8\nmjCcRTVha1v/YW4M/ooypmn9t4s2WGAzK+BrBYAGGz4DEmvuupS3Jy/+lWEyOTaC\nLax/l6xbDNrVqjCt+3gZjy5qf4m7sTbt7d9j0bxz8vKy83F1fr5iyOqC7y0OWH1O\nWp5IaCItaYC3hfo4u86Je9HXY97yuFPPm7ywIg6ffnPgz37R61ExHpKzB5mQbaZ0\n9jet5VOUgeJRCUXujKvs94ZMudTC7gh0h7nhXrX5D/DEMOFG+GFAUUy0Qx/cOQyA\nzH7SBn7sgpcI1DNh70WG/DxqUIF9JxWRDiDwQ/5ISmkeUBorAgMBAAGjGDAWMBQG\nA1UdEQQNMAuCCWxvY2FsaG9zdDANBgkqhkiG9w0BAQsFAAOCAQEAGWWv7eG4teFo\nFIZfsYZW+FE0ql7acvueARQpLl1EQVUnvo1eaJVWJ4TotIBTGnaCatum9oZeMUSL\n1FqEQFdjIn3cU2/TeUbDgHSfnZp9Or6ZmOlp9P9X4MRooJYQjIPmxNdmuIJi7LOR\nnl/e+sUeEZ6pUFdVUFwqU1SM5p28EfZyQyakO7EFp/CvivxpMmUrqfNJrlt+Jk5Y\nZ8Xz1aTxdavVuEd9fv7ZAAXdfqQgqYqzy+Mjoi72DMqMHykwDjMQBjEi7b1sr+e8\n7ZC262jNb1XpA8zOeGDGqdOAIX22H8Ezx7vrVeh8ON+2enT8+ua67qBO8iK0Xrhk\ntHC7gMHIWA==\n-----END CERTIFICATE-----\n',
    // tls_ca:
    //   '-----BEGIN CERTIFICATE-----\nMIIC0zCCAbugAwIBAgIRAMVyZO69vECfvvc40kpgQeEwDQYJKoZIhvcNAQELBQAw\nGDEWMBQGA1UEAwwNRWRnZURCIFNlcnZlcjAeFw0yNDA4MjMxNTU0MDBaFw00MzEw\nMjQxNTU0MDBaMBgxFjAUBgNVBAMMDUVkZ2VEQiBTZXJ2ZXIwggEiMA0GCSqGSIb3\nDQEBAQUAA4IBDwAwggEKAoIBAQCpwEfNmDSLxDCnaOGFtJFG7yvQ9Qfnpyal8Ts8\nmjCcRTVha1v/YW4M/ooypmn9t4s2WGAzK+BrBYAGGz4DEmvuupS3Jy/+lWEyOTaC\nLax/l6xbDNrVqjCt+3gZjy5qf4m7sTbt7d9j0bxz8vKy83F1fr5iyOqC7y0OWH1O\nWp5IaCItaYC3hfo4u86Je9HXY97yuFPPm7ywIg6ffnPgz37R61ExHpKzB5mQbaZ0\n9jet5VOUgeJRCUXujKvs94ZMudTC7gh0h7nhXrX5D/DEMOFG+GFAUUy0Qx/cOQyA\nzH7SBn7sgpcI1DNh70WG/DxqUIF9JxWRDiDwQ/5ISmkeUBorAgMBAAGjGDAWMBQG\nA1UdEQQNMAuCCWxvY2FsaG9zdDANBgkqhkiG9w0BAQsFAAOCAQEAGWWv7eG4teFo\nFIZfsYZW+FE0ql7acvueARQpLl1EQVUnvo1eaJVWJ4TotIBTGnaCatum9oZeMUSL\n1FqEQFdjIn3cU2/TeUbDgHSfnZp9Or6ZmOlp9P9X4MRooJYQjIPmxNdmuIJi7LOR\nnl/e+sUeEZ6pUFdVUFwqU1SM5p28EfZyQyakO7EFp/CvivxpMmUrqfNJrlt+Jk5Y\nZ8Xz1aTxdavVuEd9fv7ZAAXdfqQgqYqzy+Mjoi72DMqMHykwDjMQBjEi7b1sr+e8\n7ZC262jNb1XpA8zOeGDGqdOAIX22H8Ezx7vrVeh8ON+2enT8+ua67qBO8iK0Xrhk\ntHC7gMHIWA==\n-----END CERTIFICATE-----\n',
    tlsSecurity: 'insecure',
  });

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
