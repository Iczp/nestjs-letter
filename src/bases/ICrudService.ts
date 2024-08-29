import { PagedResultDto } from 'src/dtos/PagedResultDto';
import { GetListInput } from './GetListInput';
import { Workbook } from 'exceljs';
import { ExcelImportResult } from 'src/dtos/ExcelImportResult';
import { ExcelBookDto } from 'src/dtos/ExcelBookDto';

export interface ICrudService<
  TDto,
  TDetailDto,
  TGetListInput extends GetListInput,
  TCteateInput,
  TUpdateInput,
> extends IService {
  getItem(id: string): Promise<TDetailDto>;
  getList(input: TGetListInput): Promise<PagedResultDto<TDto>>;
  create(input: TCteateInput): Promise<TDetailDto>;
  update(id: string, input: TUpdateInput): Promise<TDetailDto>;
  delete(id: string): Promise<void>;
}

export interface IService {
  getItem(id: string): Promise<any>;
  getList(input: GetListInput): Promise<PagedResultDto<any>>;
  create(input: any): Promise<any>;
  update(id: string, input: any): Promise<any>;
  delete(id: string): Promise<void>;
  importExcel(workbook: Workbook): Promise<ExcelImportResult>;
  /**
   * 生成excel的sheet
   * @param workbook t
   */
  generateExcelBook(workbook: Workbook): Promise<ExcelBookDto>;

  // generateExcelData(workbook: Workbook): Promise<ExcelSheetDto[]>;
}
