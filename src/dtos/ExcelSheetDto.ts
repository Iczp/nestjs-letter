import { Column } from 'exceljs';

export class ExcelSheetDto {
  name: string;
  columns: Array<Partial<Column>>;
  items: any[];
}
