import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'exceljs';

export class ExcelSheetDto {
  @ApiProperty({ description: '名称' })
  name: string;

  @ApiProperty({ description: '列', isArray: true })
  columns: Array<Partial<Column>>;

  @ApiProperty({ description: '数据', isArray: true })
  items: any[];
}
