import { Workbook } from 'exceljs';
import { ExcelBookDto } from 'src/dtos/ExcelBookDto';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';

export interface IExcelService {
  importExcel(
    workbook: Workbook,
    request?: { query: any; body: any },
  ): Promise<ExcelImportResult>;
  /**
   * 生成excel的sheet
   * @param workbook t
   */
  generateExcel(workbook: Workbook): Promise<ExcelBookDto>;

  // generateExcelData(workbook: Workbook): Promise<ExcelSheetDto[]>;
}
