import { ApiProperty } from '@nestjs/swagger';
import { Workbook } from 'exceljs';

export class ExcelWorkbook {
  @ApiProperty({ description: '名称' })
  filename: string;

  workbook: Workbook;
}
