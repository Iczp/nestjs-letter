import { ApiProperty } from '@nestjs/swagger';

/**
 * Excel sheet
 */
export class SheetDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  rowCount: number;
  // model: x.model,
}
