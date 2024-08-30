import { Workbook } from 'exceljs';
import { ExcelWorkbook } from 'src/dtos/ExcelWorkbook';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';

export interface IExcelService<TGetListInput> {
  importExcel(
    workbook: Workbook,
    request?: { query: any; body: any },
  ): Promise<ExcelImportResult>;
  /**
   * 生成excel的sheet
   * @param workbook t
   */
  generateExcel(input: TGetListInput): Promise<ExcelWorkbook>;

  generateExampleExcel(): Promise<ExcelWorkbook>;

  // generateExcelData(workbook: Workbook): Promise<ExcelSheetDto[]>;
}
