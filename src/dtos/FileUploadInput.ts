import { ApiProperty } from '@nestjs/swagger';

export class FileUploadInput {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
