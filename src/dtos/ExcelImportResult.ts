import { ApiProperty } from '@nestjs/swagger';
import { SheetDto } from 'src/bases/SheetDto';

export class ExcelImportResult {
  constructor(success: boolean, message?: string, sheets?: SheetDto[]) {
    this.success = success;
    this.message = message;
    this.sheets = sheets;
  }

  @ApiProperty()
  public success: boolean;

  @ApiProperty()
  public message?: string;

  @ApiProperty({
    type: () => [SheetDto],
  })
  public sheets?: SheetDto[];
}
